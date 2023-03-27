import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Err, Ok, Result } from 'ts-results';
import { SpaceError } from '../../../domain/exception/space-error';
import { Space } from '../../../domain/model';
import { CreateSpaceCommand } from '../../command/create-space.command';
import { AggregateRepository, InjectAggregateRepository } from '@aulasoftwarelibre/nestjs-eventstore';
import { Inject } from '@nestjs/common';
import { SpaceFinder, SPACE_FINDER } from '../../service/space-finder.service';
import { SpaceAlreadyExistsError } from '../../../domain/exception';
import { SpaceId, SpaceQuantity, SpaceSeats } from '../../../domain/model/value-objects';

@CommandHandler(CreateSpaceCommand)
export class CreateSpaceHandler implements ICommandHandler<CreateSpaceCommand> {
    constructor(
        @InjectAggregateRepository(Space) private readonly spaceRepository: AggregateRepository<Space, SpaceId>,
        @Inject(SPACE_FINDER) private readonly spaceFinder: SpaceFinder,
    ) { }

    async execute(command: CreateSpaceCommand): Promise<Result<null, SpaceError>> {
        const id = SpaceId.fromString(command.id);

        if (await this.spaceFinder.find(id)) {
            return Err(SpaceAlreadyExistsError.withId(id))
        }

        const quantity = SpaceQuantity.fromNumber(command.quantity)
        const seats = SpaceSeats.fromNumber(command.seats)

        const space = Space.add(
            id,
            quantity,
            seats,
        );

        this.spaceRepository.save(space);

        return Ok(null)
    }
}

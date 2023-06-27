import { InjectAggregateRepository } from '@aulasoftwarelibre/nestjs-eventstore';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Err, Ok, Result } from 'neverthrow';

import { WorkspaceError } from '../../../../workspace/domain/exception';
import { SpaceAlreadyExistsError } from '../../../domain/exception';
import { SpaceError } from '../../../domain/exception/space-error';
import { Space } from '../../../domain/model';
import {
  SpaceId,
  SpaceName,
  SpaceQuantity,
  SpaceSeats,
} from '../../../domain/model/value-objects';
import { UpdateSpaceCommand } from '../../command/update-space.command';
import { SpaceRepository } from '../../../domain/service/repository.service';

@CommandHandler(UpdateSpaceCommand)
export class UpdateSpaceHandler implements ICommandHandler<UpdateSpaceCommand> {
  constructor(
    @InjectAggregateRepository(Space)
    private readonly spaceRepository: SpaceRepository<Space, SpaceId>,
  ) {}

  async execute(
    command: UpdateSpaceCommand,
  ): Promise<Result<null, SpaceError | WorkspaceError>> {
    const id = SpaceId.fromString(command.id);

    const space = await this.spaceRepository.find(id);

    if (space === null) {
      return new Err(SpaceAlreadyExistsError.withId(id));
    }

    space.updateName(SpaceName.fromString(command.name));
    space.updateQuantity(SpaceQuantity.fromNumber(command.quantity));
    space.updateSeats(SpaceSeats.fromNumber(command.seats));

    this.spaceRepository.save(space);
    return new Ok(null);
  }
}

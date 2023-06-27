import { InjectAggregateRepository } from '@aulasoftwarelibre/nestjs-eventstore';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Err, Ok, Result } from 'neverthrow';

import { DeleteSpaceCommand } from '../delete-space.command';
import { SpaceError, SpaceNotFoundError } from '../../../domain/exception';
import { Space } from '../../../domain/model';
import { SpaceId } from '../../../domain/model/value-objects';
import { SpaceRepository } from '../../../domain/service/repository.service';

@CommandHandler(DeleteSpaceCommand)
export class DeleteSpaceHandler implements ICommandHandler<DeleteSpaceCommand> {
  constructor(
    @InjectAggregateRepository(Space)
    private readonly spaceRepository: SpaceRepository<Space, SpaceId>,
  ) {}

  async execute(
    command: DeleteSpaceCommand,
  ): Promise<Result<null, SpaceError>> {
    const id = SpaceId.fromString(command.id);
    const space = await this.spaceRepository.find(id);

    if (space === null) {
      return new Err(SpaceNotFoundError.withId(id));
    }

    space.delete();
    this.spaceRepository.save(space);

    return new Ok(null);
  }
}

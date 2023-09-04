import { InjectAggregateRepository } from '@aulasoftwarelibre/nestjs-eventstore';
import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Err, Ok, Result } from 'neverthrow';

import {
  WORKSPACE_FINDER,
  WorkspaceFinder,
} from '../../../../workspace/application/service/workspace-finder.service';
import { WorkspaceError } from '../../../../workspace/domain/exception';
import { WorkspaceNotFoundError } from '../../../../workspace/domain/exception/workspace-not-found-error';
import { WorkspaceId } from '../../../../workspace/domain/model/value-objects';
import { SpaceAlreadyExistsError } from '../../../domain/exception';
import { SpaceError } from '../../../domain/exception/space-error';
import { Space } from '../../../domain/model';
import {
  SpaceId,
  SpaceName,
  SpaceQuantity,
  SpaceSeats,
} from '../../../domain/model/value-objects';
import { SpaceAmenity } from '../../../domain/model/value-objects/space-amenitys';
import { CreateSpaceCommand } from '../../command/create-space.command';
import { SPACE_FINDER, SpaceFinder } from '../../service/space-finder.service';
import { SpaceRepository } from '../../../domain/service/repository.service';

@CommandHandler(CreateSpaceCommand)
export class CreateSpaceHandler implements ICommandHandler<CreateSpaceCommand> {
  constructor(
    @InjectAggregateRepository(Space)
    private readonly spaceRepository: SpaceRepository<Space, SpaceId>,
    @Inject(SPACE_FINDER)
    private readonly spaceFinder: SpaceFinder,
    @Inject(WORKSPACE_FINDER)
    private readonly workspaceFinder: WorkspaceFinder,
  ) { }

  async execute(
    command: CreateSpaceCommand,
  ): Promise<Result<null, SpaceError | WorkspaceError>> {
    const id = SpaceId.fromString(command.id);
    if (await this.spaceFinder.find(id)) {
      return new Err(SpaceAlreadyExistsError.withId(id));
    }

    const workspaceId = WorkspaceId.fromString(command.workspaceId);
    if (!(await this.workspaceFinder.find(workspaceId))) {
      return new Err(WorkspaceNotFoundError.withId(workspaceId));
    }

    const name = SpaceName.fromString(command.name);
    const quantity = SpaceQuantity.fromNumber(command.quantity);
    const seats = SpaceSeats.fromNumber(command.seats);

    const spaceAmenitiesResult = SpaceAmenity.fromStringList(command.amenitys);

    return spaceAmenitiesResult.match<Result<null, SpaceError>>(
      (spaceAmenities) => {
        const space = Space.add(
          id,
          workspaceId,
          name,
          quantity,
          seats,
          spaceAmenities,
          command.image
        );
        this.spaceRepository.save(space);

        return new Ok(null);
      },
      (err) => {
        return new Err(err);
      },
    );
  }
}

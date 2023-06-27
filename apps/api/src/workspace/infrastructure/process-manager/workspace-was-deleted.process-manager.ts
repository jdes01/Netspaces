import {
  CommandBus,
  EventsHandler,
  ICommand,
  IEventHandler,
} from '@nestjs/cqrs';

import { WorkspaceWasDeletedEvent } from '../../domain/event';
import { Result } from 'neverthrow';
import { UserError } from '../../../user/domain/exception';
import { WorkspaceId } from '../../domain/model/value-objects';
import { Inject } from '@nestjs/common';
import { SPACE_FINDER, SpaceFinder } from '../../../space/application/service';
import { DeleteSpaceCommand } from '../../../space/application/command/delete-space.command';

@EventsHandler(WorkspaceWasDeletedEvent)
export class WorkspaceWasDeletedProcessManager
  implements IEventHandler<WorkspaceWasDeletedEvent>
{
  constructor(
    @Inject(SPACE_FINDER)
    private readonly spaceFinder: SpaceFinder,
    private readonly commandBus: CommandBus,
  ) {}

  async handle(event: WorkspaceWasDeletedEvent) {
    const workspaceSpaces = await this.spaceFinder.findByWorkspaceId(
      WorkspaceId.fromString(event.id),
    );

    if (workspaceSpaces.length > 0) {
      workspaceSpaces.map((space) => {
        this.commandBus.execute<ICommand, Result<null, UserError>>(
          new DeleteSpaceCommand(space._id),
        );
      });
    }
  }
}

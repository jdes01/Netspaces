import {
  CommandBus,
  EventsHandler,
  ICommand,
  IEventHandler,
} from '@nestjs/cqrs';

import { CompanyWasDeletedEvent } from '../../domain/event';
import { Result } from 'neverthrow';
import { UserError } from '../../../user/domain/exception';
import { DeleteUserCommand } from '../../../user/application/command/delete-user.command';
import {
  USER_FINDER,
  UserFinder,
} from '../../../user/application/service/user-finder.service';
import { CompanyId } from '../../domain/model/value-objects';
import { Inject } from '@nestjs/common';
import {
  WORKSPACE_FINDER,
  WorkspaceFinder,
} from '../../../workspace/application/service/workspace-finder.service';
import { DeleteWorkspaceCommand } from '../../../workspace/application/command/delete-workspace.command';

@EventsHandler(CompanyWasDeletedEvent)
export class CompanyWasDeletedProcessManager
  implements IEventHandler<CompanyWasDeletedEvent>
{
  constructor(
    @Inject(USER_FINDER)
    private readonly userFinder: UserFinder,
    @Inject(WORKSPACE_FINDER)
    private readonly workspaceFinder: WorkspaceFinder,
    private readonly commandBus: CommandBus,
  ) {}

  async handle(event: CompanyWasDeletedEvent) {
    const companyUsers = await this.userFinder.findByCompanyId(
      CompanyId.fromString(event.id),
    );

    if (companyUsers.length > 0) {
      companyUsers.map((user) => {
        this.commandBus.execute<ICommand, Result<null, UserError>>(
          new DeleteUserCommand(user._id),
        );
      });
    }

    const companyWorkspaces = await this.workspaceFinder.findByCompanyId(
      CompanyId.fromString(event.id),
    );

    if (companyWorkspaces.length > 0) {
      companyWorkspaces.map((workspace) => {
        this.commandBus.execute<ICommand, Result<null, UserError>>(
          new DeleteWorkspaceCommand(workspace._id),
        );
      });
    }
  }
}

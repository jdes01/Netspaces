import { InjectAggregateRepository } from '@aulasoftwarelibre/nestjs-eventstore';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Err, Ok, Result } from 'neverthrow';

import { DeleteWorkspaceCommand } from '../delete-workspace.command';
import {
  WorkspaceError,
  WorkspaceNotFoundError,
} from '../../../domain/exception';
import { Workspace } from '../../../domain/model';
import { WorkspaceId } from '../../../domain/model/value-objects';
import { WorkspaceRepository } from '../../../domain/service/repository.service';

@CommandHandler(DeleteWorkspaceCommand)
export class DeleteWorkspaceHandler
  implements ICommandHandler<DeleteWorkspaceCommand>
{
  constructor(
    @InjectAggregateRepository(Workspace)
    private readonly workspaceRepository: WorkspaceRepository<
      Workspace,
      WorkspaceId
    >,
  ) {}

  async execute(
    command: DeleteWorkspaceCommand,
  ): Promise<Result<null, WorkspaceError>> {
    const id = WorkspaceId.fromString(command.id);
    const workspace = await this.workspaceRepository.find(id);

    if (workspace === null) {
      return new Err(WorkspaceNotFoundError.withId(id));
    }

    workspace.delete();
    this.workspaceRepository.save(workspace);

    return new Ok(null);
  }
}

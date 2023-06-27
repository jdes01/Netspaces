import { InjectAggregateRepository } from '@aulasoftwarelibre/nestjs-eventstore';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Err, Ok, Result } from 'neverthrow';

import { UpdateWorkspaceCommand } from '../../../application/command/update-workspace.command';
import { WorkspaceAlreadyExistsError } from '../../../domain/exception';
import { WorkspaceError } from '../../../domain/exception/workspace-error';
import { Workspace } from '../../../domain/model';
import {
  WorkspaceDescription,
  WorkspaceId,
  WorkspaceLocation,
  WorkspaceName,
} from '../../../domain/model/value-objects';
import { WorkspaceRepository } from '../../../domain/service/repository.service';

@CommandHandler(UpdateWorkspaceCommand)
export class UpdateWorkspaceHandler
  implements ICommandHandler<UpdateWorkspaceCommand>
{
  constructor(
    @InjectAggregateRepository(Workspace)
    private readonly workspaceRepository: WorkspaceRepository<
      Workspace,
      WorkspaceId
    >,
  ) {}

  async execute(
    command: UpdateWorkspaceCommand,
  ): Promise<Result<null, WorkspaceError>> {
    const id = WorkspaceId.fromString(command.id);
    const workspace = await this.workspaceRepository.find(id);

    if (workspace === null)
      return new Err(WorkspaceAlreadyExistsError.withId(id));

    workspace.updateName(WorkspaceName.fromString(command.name));
    workspace.updateDescription(
      WorkspaceDescription.fromString(command.description),
    );
    workspace.updateLocation(
      new WorkspaceLocation(command.street, command.city, command.country),
    );

    this.workspaceRepository.save(workspace);
    return new Ok(null);
  }
}

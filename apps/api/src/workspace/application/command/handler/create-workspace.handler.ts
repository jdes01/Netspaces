import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Err, Result } from 'ts-results';
import { WorkspaceError } from '../../../domain/exception/workspace-error';
import { WorkspaceAlreadyExistsError } from '../../../domain/exception/workspace-already-exists-error';
import { Workspace } from '../../../domain/model';
import { WorkspaceDescription, WorkspaceId, WorkspaceLocation, WorkspaceName } from '../../../domain/model/value-objects';
import { WorkspaceRepository, WORKSPACE_REPOSITORY } from '../../../domain/repository/';
import { CreateWorkspaceCommand } from '../../command/create-workspace.command';

@CommandHandler(CreateWorkspaceCommand)
export class CreateWorkspaceHandler implements ICommandHandler<CreateWorkspaceCommand> {
    constructor(
        @Inject(WORKSPACE_REPOSITORY) private readonly workspaceRepository: WorkspaceRepository,
    ) { }

    async handle(command: CreateWorkspaceCommand): Promise<Result<null, WorkspaceError>> {

        const id = WorkspaceId.fromString(command.id)

        if (await this.workspaceRepository.find(id)) {
            return Err(WorkspaceAlreadyExistsError.withString(id))
        }

        const workspace = Workspace.add(
            id,
            WorkspaceName.fromString(command.name),
            WorkspaceDescription.fromString(command.description),
            WorkspaceLocation.create(command.location),
        );

        return this.workspaceRepository.save(workspace);
    }
}

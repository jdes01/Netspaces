import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Result } from 'ts-results';
import { v4 as uuid } from 'uuid';
import { Workspace } from '../../domain/model';
import { WorkspaceDescription, WorkspaceId, WorkspaceLocation, WorkspaceName } from '../../domain/model/value-objects';
import { WorkspaceRepository, WORKSPACE_REPOSITORY } from '../../domain/repository/';
import { CreateWorkspaceCommand } from '../command/create-workspace.command';


@CommandHandler(CreateWorkspaceCommand)
export class CreateWorkspaceHandler implements ICommandHandler<CreateWorkspaceCommand> {
    constructor(
        @Inject(WORKSPACE_REPOSITORY) private readonly workspaceRepository: WorkspaceRepository,
    ) { }

    async handle(command: CreateWorkspaceCommand): Promise<Result<null, Error>> {

        const id = WorkspaceId.fromString(command.id)
        const name = WorkspaceName.fromString(command.name)
        const description = WorkspaceDescription.fromString(command.description)

        const location: WorkspaceLocation = WorkspaceLocation.create(command.location)

        const workspace = Workspace.add(
            id,
            name,
            description,
            location,
        );

        return this.workspaceRepository.save(workspace);
    }
}

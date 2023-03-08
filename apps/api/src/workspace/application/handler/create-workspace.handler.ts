import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { v4 as uuid } from 'uuid';
import { Workspace } from '../../domain/model';
import { WorkspaceDescription, WorkspaceId, WorkspaceLocation, WorkspaceName } from '../../domain/model/value-objects';
import { CreateWorkspaceCommand } from '../command/create-workspace.command';


@CommandHandler(CreateWorkspaceCommand)
export class CreateWorkspaceHandler implements ICommandHandler<CreateWorkspaceCommand> {
    constructor(
        @Inject(WORKSPACES) private readonly workspaceRepository: WorkspaceRepository,
    ) { }

    async execute(command: CreateWorkspaceCommand) {

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

        this.workspaceRepository.save(workspace);
    }
}

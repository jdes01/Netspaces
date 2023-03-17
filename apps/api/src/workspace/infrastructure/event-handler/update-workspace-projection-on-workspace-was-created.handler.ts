import { Inject } from "@nestjs/common";
import { EventsHandler, IEventHandler } from "@nestjs/cqrs";
import { WorkspaceWasCreatedEvent } from "../../domain/event";
import { WorkspaceProjection, WORKSPACE_PROJECTION } from "../../domain/projection";
import { WorkspaceReadModel } from "../../domain/read-model/workspace.read-model";

@EventsHandler(WorkspaceWasCreatedEvent)
export class UpdateWorkspaceProjectionOnWorkspaceWasCreated implements IEventHandler<WorkspaceWasCreatedEvent> {
    constructor(
        @Inject(WORKSPACE_PROJECTION) private readonly workspaceProjection: WorkspaceProjection,
    ) { }

    async handle(event: WorkspaceWasCreatedEvent) {
        const workspaceReadModel: WorkspaceReadModel = { id: event.id, name: event.name, description: event.description }
        this.workspaceProjection.save(workspaceReadModel)
    }
}
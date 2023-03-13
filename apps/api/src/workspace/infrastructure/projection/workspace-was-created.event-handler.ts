import { Inject } from "@nestjs/common";
import { EventsHandler, IEventHandler } from "@nestjs/cqrs";
import { Model } from "mongoose";
import { WorkspaceWasCreatedEvent } from "../../domain/event";
import { WorkspaceView } from "../view/workspace.view";

@EventsHandler(WorkspaceWasCreatedEvent)
export class WorkspaceWasCreatedEventHandler implements IEventHandler<WorkspaceWasCreatedEvent> {
    constructor(
        @Inject('WORKSPACE_VIEW') private readonly workspaceView: Model<WorkspaceView>,
    ) { }

    async handle(event: WorkspaceWasCreatedEvent) {
        const workspaceView = new this.workspaceView({
            _id: event.id,
            name: event.name,
            description: event.description
        });

        return workspaceView.save();
    }
}
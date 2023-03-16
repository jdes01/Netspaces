import { Inject } from "@nestjs/common";
import { EventsHandler, IEventHandler } from "@nestjs/cqrs";
import { Model } from "mongoose";
import { WorkspaceWasCreatedEvent } from "../../../domain/event";
import { WorkspaceDocument } from "../schema/workspace.schema";

@EventsHandler(WorkspaceWasCreatedEvent)
export class WorkspaceWasCreatedProjection implements IEventHandler<WorkspaceWasCreatedEvent> {
    constructor(
        @Inject('WORKSPACE_MONGOOSE_MODEL') private readonly workspaceMongooseModel: Model<WorkspaceDocument>,
    ) { }

    async handle(event: WorkspaceWasCreatedEvent) {
        const workspaceMongooseDocument
            = new this.workspaceMongooseModel({
                _id: event.id,
                name: event.name,
                description: event.description
            });

        return workspaceMongooseDocument.save();
    }
}
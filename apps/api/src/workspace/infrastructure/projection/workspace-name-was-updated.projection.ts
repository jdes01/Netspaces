import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { WorkspaceNameWasUpdatedEvent } from '../../domain/event';
import { WORKSPACE_PROJECTION, WorkspaceDocument } from './workspace.schema';
import { Logger } from '@nestjs/common';

@EventsHandler(WorkspaceNameWasUpdatedEvent)
export class WorkspaceNameWasUpdatedProjection implements IEventHandler<WorkspaceNameWasUpdatedEvent> {
    constructor(
        @InjectModel(WORKSPACE_PROJECTION)
        private readonly workspaceProjection: Model<WorkspaceDocument>,
    ) { }

    async handle(event: WorkspaceNameWasUpdatedEvent) {
        Logger.log("HOLA")
        this.workspaceProjection
            .findByIdAndUpdate(event.id, {
                name: event.name,
            })
            .exec();
    }
}

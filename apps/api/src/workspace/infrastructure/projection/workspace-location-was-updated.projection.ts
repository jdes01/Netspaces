import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { WorkspaceLocationWasUpdatedEvent } from '../../domain/event';
import { WORKSPACE_PROJECTION, WorkspaceDocument } from './workspace.schema';

@EventsHandler(WorkspaceLocationWasUpdatedEvent)
export class WorkspaceLocationWasUpdatedProjection implements IEventHandler<WorkspaceLocationWasUpdatedEvent> {
    constructor(
        @InjectModel(WORKSPACE_PROJECTION)
        private readonly workspaceProjection: Model<WorkspaceDocument>,
    ) { }

    async handle(event: WorkspaceLocationWasUpdatedEvent) {
        this.workspaceProjection
            .findByIdAndUpdate(event.id, {
                street: event.street,
                city: event.city,
                country: event.country,
            })
            .exec();
    }
}

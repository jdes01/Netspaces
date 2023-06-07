import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { SpaceNameWasUpdatedEvent } from '../../domain/event';
import { SPACE_PROJECTION, SpaceDocument } from './space.schema';

@EventsHandler(SpaceNameWasUpdatedEvent)
export class SpaceNameWasUpdatedProjection implements IEventHandler<SpaceNameWasUpdatedEvent> {
    constructor(
        @InjectModel(SPACE_PROJECTION)
        private readonly spaceProjection: Model<SpaceDocument>,
    ) { }

    async handle(event: SpaceNameWasUpdatedEvent) {
        this.spaceProjection
            .findByIdAndUpdate(event.id, {
                name: event.name,
            })
            .exec();
    }
}

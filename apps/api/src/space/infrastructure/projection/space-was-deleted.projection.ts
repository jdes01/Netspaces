import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { SpaceWasDeletedEvent } from '../../domain/event';
import { SPACE_PROJECTION, SpaceDocument } from './space.schema';

@EventsHandler(SpaceWasDeletedEvent)
export class SpaceWasDeletedProjection implements IEventHandler<SpaceWasDeletedEvent> {
    constructor(
        @InjectModel(SPACE_PROJECTION)
        private readonly spaceProjection: Model<SpaceDocument>,
    ) { }

    async handle(event: SpaceWasDeletedEvent) {
        const spaceView = await this.spaceProjection
            .findById(event.id)
            .exec();

        spaceView.remove()
    }
}

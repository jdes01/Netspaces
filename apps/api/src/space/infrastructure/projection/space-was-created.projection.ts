import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { SpaceWasCreatedEvent } from '../../domain/event';
import { SPACE_PROJECTION, SpaceDocument } from './space.schema';

@EventsHandler(SpaceWasCreatedEvent)
export class SpaceWasCreatedProjection
  implements IEventHandler<SpaceWasCreatedEvent>
{
  constructor(
    @InjectModel(SPACE_PROJECTION)
    private readonly spaceProjection: Model<SpaceDocument>,
  ) {}

  async handle(event: SpaceWasCreatedEvent) {
    const space = new this.spaceProjection({ ...event.payload });
    await space.save();
  }
}

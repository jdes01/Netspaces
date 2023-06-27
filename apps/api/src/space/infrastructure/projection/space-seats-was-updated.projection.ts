import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { SpaceSeatsWasUpdatedEvent } from '../../domain/event';
import { SPACE_PROJECTION, SpaceDocument } from './space.schema';

@EventsHandler(SpaceSeatsWasUpdatedEvent)
export class SpaceSeatsWasUpdatedProjection
  implements IEventHandler<SpaceSeatsWasUpdatedEvent>
{
  constructor(
    @InjectModel(SPACE_PROJECTION)
    private readonly spaceProjection: Model<SpaceDocument>,
  ) {}

  async handle(event: SpaceSeatsWasUpdatedEvent) {
    this.spaceProjection
      .findByIdAndUpdate(event.id, {
        seats: event.seats,
      })
      .exec();
  }
}

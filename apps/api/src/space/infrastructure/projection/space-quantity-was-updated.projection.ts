import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { SpaceQuantityWasUpdatedEvent } from '../../domain/event';
import { SPACE_PROJECTION, SpaceDocument } from './space.schema';

@EventsHandler(SpaceQuantityWasUpdatedEvent)
export class SpaceQuantityWasUpdatedProjection
  implements IEventHandler<SpaceQuantityWasUpdatedEvent>
{
  constructor(
    @InjectModel(SPACE_PROJECTION)
    private readonly spaceProjection: Model<SpaceDocument>,
  ) {}

  async handle(event: SpaceQuantityWasUpdatedEvent) {
    this.spaceProjection
      .findByIdAndUpdate(event.id, {
        quantity: event.quantity,
      })
      .exec();
  }
}

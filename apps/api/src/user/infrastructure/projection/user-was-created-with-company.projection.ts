import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { UserWasCreatedWithCompanyEvent } from '../../domain/event';
import { USER_PROJECTION, UserDocument } from './user.schema';

@EventsHandler(UserWasCreatedWithCompanyEvent)
export class UserWasCreatedWithCompanyProjection
  implements IEventHandler<UserWasCreatedWithCompanyEvent>
{
  constructor(
    @InjectModel(USER_PROJECTION)
    private readonly userProjection: Model<UserDocument>,
  ) {}

  async handle(event: UserWasCreatedWithCompanyEvent) {
    const user = new this.userProjection({
      ...event.payload,
    });
    await user.save();
  }
}

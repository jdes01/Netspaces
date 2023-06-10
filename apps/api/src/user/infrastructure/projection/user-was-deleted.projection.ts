import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { UserWasDeletedEvent } from '../../domain/event';
import { USER_PROJECTION, UserDocument } from './user.schema';

@EventsHandler(UserWasDeletedEvent)
export class UserWasDeletedProjection implements IEventHandler<UserWasDeletedEvent> {
    constructor(
        @InjectModel(USER_PROJECTION)
        private readonly userProjection: Model<UserDocument>,
    ) { }

    async handle(event: UserWasDeletedEvent) {
        const userView = await this.userProjection
            .findById(event.id)
            .exec();

        userView.remove()
    }
}

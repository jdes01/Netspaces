import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { UserNameWasUpdatedEvent } from '../../domain/event';
import { USER_PROJECTION, UserDocument } from './user.schema';

@EventsHandler(UserNameWasUpdatedEvent)
export class UserNameWasUpdatedProjection implements IEventHandler<UserNameWasUpdatedEvent> {
    constructor(
        @InjectModel(USER_PROJECTION)
        private readonly userProjection: Model<UserDocument>,
    ) { }

    async handle(event: UserNameWasUpdatedEvent) {
        this.userProjection
            .findByIdAndUpdate(event.id, {
                name: event.name,
            })
            .exec();
    }
}

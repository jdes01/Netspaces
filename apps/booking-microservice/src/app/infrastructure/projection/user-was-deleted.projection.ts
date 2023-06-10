import { Controller, Logger } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';
import { InjectModel } from '@nestjs/mongoose';
import { USER_WAS_DELETED_MESSAGE, UserWasDeletedMessage } from '@netspaces/contracts';
import { Model } from 'mongoose';

import { USER_PROJECTION, UserDocument } from './schema/user.schema';

@Controller()
export class UserWasDeletedProjection {
    constructor(
        @InjectModel(USER_PROJECTION)
        private readonly userProjection: Model<UserDocument>,
    ) { }

    @EventPattern(USER_WAS_DELETED_MESSAGE)
    async handle(message: UserWasDeletedMessage) {
        const userView = await this.userProjection
            .findById(message._id)
            .exec();

        userView.remove();

        Logger.log(`User ${message._id} removed`);
    }
}

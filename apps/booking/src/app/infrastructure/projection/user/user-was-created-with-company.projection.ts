import { Inject } from '@nestjs/common';
import { Controller } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';
import { InjectModel } from '@nestjs/mongoose';
import { USER_WAS_CREATED_WITH_COMPANY_MESSAGE, UserWasCreatedWithCompanyMessage } from '@netspaces/contracts';
import { Model } from 'mongoose';

import { USER_PROJECTION, UserDocument } from '../schema/user.schema';

import { WINSTON_MODULE_PROVIDER } from 'nest-winston';

import { Logger } from 'winston';

@Controller()
export class UserWasCreatedWithCompanyProjection {
    constructor(
        @InjectModel(USER_PROJECTION)
        private readonly userProjection: Model<UserDocument>,
        @Inject(WINSTON_MODULE_PROVIDER)
        private readonly logger: Logger
    ) { }

    @EventPattern(USER_WAS_CREATED_WITH_COMPANY_MESSAGE)
    async handle(message: UserWasCreatedWithCompanyMessage) {
        const user = new this.userProjection({
            ...message,
        });
        await user.save();

        this.logger.info("User stored", { userId: message._id });
    }
}

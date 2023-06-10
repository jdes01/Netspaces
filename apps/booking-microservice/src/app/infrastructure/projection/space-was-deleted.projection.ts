import { Controller, Logger } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';
import { InjectModel } from '@nestjs/mongoose';
import { SPACE_WAS_DELETED_MESSAGE, SpaceWasDeletedMessage } from '@netspaces/contracts';
import { Model } from 'mongoose';

import { SPACE_PROJECTION, SpaceDocument } from './schema/space.schema';

@Controller()
export class SpaceWasDeletedProjection {
    constructor(
        @InjectModel(SPACE_PROJECTION)
        private readonly spaceProjection: Model<SpaceDocument>,
    ) { }

    @EventPattern(SPACE_WAS_DELETED_MESSAGE)
    async handle(message: SpaceWasDeletedMessage) {
        const spaceView = await this.spaceProjection
            .findById(message._id)
            .exec();

        spaceView.remove();

        Logger.log(`Space ${message._id} removed`);
    }
}

import { Controller, Logger } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';
import { InjectModel } from '@nestjs/mongoose';
import { SPACE_QUANTITY_WAS_UPDATED_MESSAGE, SpaceQuantityWasUpdatedMessage } from '@netspaces/contracts';
import { Model } from 'mongoose';

import { SPACE_PROJECTION, SpaceDocument } from './schema/space.schema';

@Controller()
export class SpaceQuantityWasUpdatedProjection {
    constructor(
        @InjectModel(SPACE_PROJECTION)
        private readonly spaceProjection: Model<SpaceDocument>,
    ) { }

    @EventPattern(SPACE_QUANTITY_WAS_UPDATED_MESSAGE)
    async handle(message: SpaceQuantityWasUpdatedMessage) {
        this.spaceProjection
            .findByIdAndUpdate(message._id, {
                quantity: message.quantity,
            })
            .exec();

        Logger.log(`Space ${message._id} quantity was updated to ${message.quantity}`);
    }
}

import { Controller, Logger } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';
import { InjectModel } from '@nestjs/mongoose';
import { SPACE_WAS_DELETED_MESSAGE, SpaceWasDeletedMessage } from '@netspaces/contracts';
import { Model } from 'mongoose';

import { SPACE_PROJECTION, SpaceDocument } from './schema/space.schema';
import { BOOKING_PROJECTION, BookingDocument } from './schema/booking.schema';

@Controller()
export class SpaceWasDeletedProjection {
    constructor(
        @InjectModel(SPACE_PROJECTION)
        private readonly spaceProjection: Model<SpaceDocument>,
        @InjectModel(BOOKING_PROJECTION)
        private readonly bookingProjection: Model<BookingDocument>,
    ) { }

    @EventPattern(SPACE_WAS_DELETED_MESSAGE)
    async handle(message: SpaceWasDeletedMessage) {
        const spaceView = await this.spaceProjection
            .findById(message._id)
            .exec();

        spaceView.remove();

        const bookingViews = await this.bookingProjection
            .find({ spaceId: message._id })
            .exec();

        if (bookingViews.length > 0) {
            bookingViews.map(
                (bookingView) => bookingView.remove()
            )
        }

        Logger.log(`Space ${message._id} removed`);
    }
}

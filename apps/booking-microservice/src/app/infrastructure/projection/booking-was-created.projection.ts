import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { BOOKING_PROJECTION, BookingDocument } from './schema/booking.schema';
import { Controller, Logger } from '@nestjs/common';
import { BookingWasCreatedEvent } from '../../domain/event';

@Controller()
export class BookingWasCreatedProjection {
    constructor(
        @InjectModel(BOOKING_PROJECTION)
        private readonly bookingProjection: Model<BookingDocument>,
    ) { }

    async handle(message: BookingWasCreatedEvent) {

        const booking = new this.bookingProjection({
            ...message,
        });
        await booking.save();

        Logger.log(`Booking ${message._id} stored`)
    }
}

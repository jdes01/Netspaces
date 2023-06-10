import { Controller, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { BOOKING_PROJECTION, BookingDocument } from './schema/booking.schema';
import { EventsHandler } from '@nestjs/cqrs';
import { BookingWasDeletedEvent } from '../../domain/event';

@EventsHandler(BookingWasDeletedEvent)
@Controller()
export class BookingWasDeletedProjection {
    constructor(
        @InjectModel(BOOKING_PROJECTION)
        private readonly bookingProjection: Model<BookingDocument>,
    ) { }

    async handle(event: BookingWasDeletedEvent) {
        const bookingView = await this.bookingProjection
            .findById(event.id)
            .exec();

        bookingView.remove();

        Logger.log(`Booking ${event.id} removed`);
    }
}

import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { BOOKING_PROJECTION, BookingDocument } from './schema/booking.schema';
import { Logger } from '@nestjs/common';
import { BookingWasCreatedEvent } from '../../domain/event';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

@EventsHandler(BookingWasCreatedEvent)
export class BookingWasCreatedProjection implements IEventHandler<BookingWasCreatedEvent>  {
    constructor(
        @InjectModel(BOOKING_PROJECTION)
        private readonly bookingProjection: Model<BookingDocument>,
    ) { }

    async handle(event: BookingWasCreatedEvent) {

        const booking = new this.bookingProjection({
            ...event.payload,
        });
        await booking.save();

        Logger.log(`Booking ${event.id} stored`)
    }
}

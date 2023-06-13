import { Controller, Inject } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { BOOKING_PROJECTION, BookingDocument } from '../schema/booking.schema';
import { EventsHandler } from '@nestjs/cqrs';
import { BookingWasDeletedEvent } from '../../../domain/event';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';

@EventsHandler(BookingWasDeletedEvent)
@Controller()
export class BookingWasDeletedProjection {
    constructor(
        @InjectModel(BOOKING_PROJECTION)
        private readonly bookingProjection: Model<BookingDocument>,
        @Inject(WINSTON_MODULE_PROVIDER)
        private readonly logger: Logger,
    ) { }

    async handle(event: BookingWasDeletedEvent) {
        const bookingView = await this.bookingProjection
            .findById(event.id)
            .exec();

        bookingView.remove();

        this.logger.info("Booking removed", { bookingId: event.id });
    }
}

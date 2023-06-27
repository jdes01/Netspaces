import { Inject } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { BookingWasCreatedEvent } from '../../../domain/event';
import { BOOKING_PROJECTION, BookingDocument } from '../schema/booking.schema';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';

@EventsHandler(BookingWasCreatedEvent)
export class BookingWasCreatedProjection
  implements IEventHandler<BookingWasCreatedEvent>
{
  constructor(
    @InjectModel(BOOKING_PROJECTION)
    private readonly bookingProjection: Model<BookingDocument>,
    @Inject(WINSTON_MODULE_PROVIDER)
    private readonly logger: Logger,
  ) {}

  async handle(event: BookingWasCreatedEvent) {
    const booking = new this.bookingProjection({
      ...event.payload,
      date: new Date(event.payload.date),
    });
    await booking.save();

    this.logger.info('Booking created', { bookingId: event.id });
  }
}

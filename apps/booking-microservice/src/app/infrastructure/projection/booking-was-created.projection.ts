import { Logger } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { BookingWasCreatedEvent } from '../../domain/event';
import { BOOKING_PROJECTION, BookingDocument } from './schema/booking.schema';

@EventsHandler(BookingWasCreatedEvent)
export class BookingWasCreatedProjection implements IEventHandler<BookingWasCreatedEvent> {
	constructor(
		@InjectModel(BOOKING_PROJECTION)
		private readonly bookingProjection: Model<BookingDocument>,
	) {}

	async handle(event: BookingWasCreatedEvent) {
		const booking = new this.bookingProjection({
			...event.payload,
		});
		await booking.save();

		Logger.log(`Booking ${event.id} stored`);
	}
}

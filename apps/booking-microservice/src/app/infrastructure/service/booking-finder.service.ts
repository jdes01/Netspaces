import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { BookingDTO } from '@netspaces/contracts';
import { Model } from 'mongoose';

import { BookingFinder } from '../../application/service/booking-finder.service';
import { BookingDate, BookingId, BookingSpaceId } from '../../domain/model/value-objects';
import { BOOKING_PROJECTION, BookingDocument } from '../projection/schema/booking.schema';

@Injectable()
export class MongoDBBookingFinder implements BookingFinder {
	constructor(
		@InjectModel(BOOKING_PROJECTION)
		private readonly bookingProjection: Model<BookingDocument>,
	) {}

	find(id: BookingId): Promise<BookingDTO | null> {
		return this.bookingProjection.findById(id.value).exec();
	}

	async findByDateForSpace(spaceId: BookingSpaceId, bookingDate: BookingDate): Promise<Array<BookingDTO>> {
		return await this.bookingProjection
			.find({
				day: bookingDate.day,
				month: bookingDate.month,
				spaceId: spaceId.value,
				year: bookingDate.year,
			})
			.exec();
	}
}

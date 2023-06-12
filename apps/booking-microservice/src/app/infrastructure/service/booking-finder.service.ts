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
	) { }

	find(id: BookingId): Promise<BookingDTO | null> {
		return this.bookingProjection.findById(id.value).exec();
	}

	async findByDateForSpace(spaceId: BookingSpaceId, bookingDate: BookingDate): Promise<Array<BookingDTO>> {
		return await this.bookingProjection
			.find({
				date: bookingDate.toSerializedDate(),
				spaceId: { $eq: spaceId.value },
			})
			.exec();
	}

	async findBySpace(spaceId: BookingSpaceId): Promise<Array<BookingDTO>> {
		const bookingsViews = await this.bookingProjection
			.find({
				spaceId: { $eq: spaceId.value },
			})
			.exec();

		return bookingsViews.map(
			bookingsView => {
				const date = new Date(bookingsView.date)
				return { _id: bookingsView._id, userId: bookingsView.userId, spaceId: bookingsView.spaceId, date: date.toLocaleDateString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' }).replace(/\//g, '-') }
			}
		)
	}

	async findSpaceUnavailableDates(spaceId: BookingSpaceId, spaceQuantity: number): Promise<Array<string>> {
		const bookings = await this.bookingProjection
			.find({
				spaceId: { $eq: spaceId.value },
			})
			.exec();

		const bookingDates: Array<string> = bookings.map(booking => booking.date)

		const bookingDateFrequency = bookingDates.reduce((frequencyMap, date) => {
			const count = frequencyMap.get(date) || 0;
			frequencyMap.set(date, count + 1);
			return frequencyMap;
		}, new Map<string, number>());

		return Array.from(bookingDateFrequency.entries()).filter(([_, appearance]) => appearance >= spaceQuantity).map(([key, _]) => key);

	}

	async findSpacePendingBookings(spaceId: BookingSpaceId): Promise<Array<BookingDTO>> {
		const currentDate = new Date()
		return await this.bookingProjection
			.find({
				spaceId: { $eq: spaceId.value },
				date: { $gt: currentDate }
			})
			.exec();
	}
}


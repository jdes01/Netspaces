import { Inject } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { BookingDTO } from '@netspaces/contracts';

import { BookingSpaceId } from '../../../domain/model/value-objects';
import { BOOKING_FINDER, BookingFinder } from '../../service/booking-finder.service';
import { GetBookingsBySpaceQuery } from '../get-bookings-by-space.query';

@QueryHandler(GetBookingsBySpaceQuery)
export class GetBookingsBySpaceHandler implements IQueryHandler {
	constructor(
		@Inject(BOOKING_FINDER)
		private readonly bookingFinder: BookingFinder,
	) {}

	async execute(query: GetBookingsBySpaceQuery): Promise<Array<BookingDTO>> {
		return this.bookingFinder.findBySpace(BookingSpaceId.fromString(query.spaceId));
	}
}

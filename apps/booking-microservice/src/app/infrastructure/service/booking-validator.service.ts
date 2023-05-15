import { Inject, Injectable } from '@nestjs/common';
import { Err, Ok, Result } from 'neverthrow';

import { BOOKING_FINDER, BookingFinder } from '../../application/service/booking-finder.service';
import { BookingValidator } from '../../application/service/booking-validator.service';
import { SPACE_FINDER, SpaceFinder } from '../../application/service/space-finder.service';
import { USER_FINDER, UserFinder } from '../../application/service/user-finder.service';
import {
	BookingAlreadyExistsError,
	BookingError,
	BookingSpaceNotFoundError,
	BookingUserNotFoundError,
	SpaceBookingNotAvailableError,
} from '../../domain/exception';
import { BookingDate, BookingId, BookingSpaceId, BookingUserId } from '../../domain/model/value-objects';

@Injectable()
export class MongoDBBookingValidator implements BookingValidator {
	constructor(
		@Inject(BOOKING_FINDER)
		private readonly bookingFinder: BookingFinder,
		@Inject(USER_FINDER)
		private readonly userFinder: UserFinder,
		@Inject(SPACE_FINDER)
		private readonly spaceFinder: SpaceFinder,
	) {}

	async validate(
		userId: BookingUserId,
		spaceId: BookingSpaceId,
		bookingId: BookingId,
		bookingDate: BookingDate,
	): Promise<Result<null, BookingError>> {
		if (await this.bookingFinder.find(bookingId)) return new Err(BookingAlreadyExistsError.withId(bookingId));
		if ((await this.userFinder.find(userId)) === null) return new Err(BookingUserNotFoundError.withUserId(userId));

		return (await this.checkForAvailability(spaceId, bookingDate)).match<Result<null, SpaceBookingNotAvailableError>>(
			(_) => {
				return new Ok(null);
			},
			(err) => {
				return new Err(err);
			},
		);
	}

	async checkForAvailability(spaceId: BookingSpaceId, bookingDate: BookingDate): Promise<Result<null, SpaceBookingNotAvailableError>> {
		const space = await this.spaceFinder.find(spaceId);
		if (space === null) return new Err(BookingSpaceNotFoundError.withSpaceId(spaceId));

		const existingBookings = await this.bookingFinder.findByDateForSpace(spaceId, bookingDate);

		if (space.quantity <= existingBookings.length) return new Err(SpaceBookingNotAvailableError.withSpaceId(spaceId));

		return new Ok(null);
	}
}

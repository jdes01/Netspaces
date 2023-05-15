import { Inject, Injectable } from '@nestjs/common';

import { BOOKING_FINDER, BookingFinder } from '../../application/service/booking-finder.service';
import { BookingId, BookingSpaceId, BookingUserId } from '../../domain/model/value-objects';
import { BookingValidator } from '../../application/service/booking-validator.service';
import { BookingAlreadyExistsError, BookingError, BookingSpaceNotFoundError, BookingUserNotFoundError } from '../../domain/exception';
import { Err, Ok, Result } from 'neverthrow';
import { USER_FINDER, UserFinder } from '../../application/service/user-finder.service';
import { SPACE_FINDER, SpaceFinder } from '../../application/service/space-finder.service';

@Injectable()
export class MongoDBBookingValidator implements BookingValidator {
    constructor(
        @Inject(BOOKING_FINDER)
        private readonly bookingFinder: BookingFinder,
        @Inject(USER_FINDER)
        private readonly userFinder: UserFinder,
        @Inject(SPACE_FINDER)
        private readonly spaceFinder: SpaceFinder,

    ) { }

    async validate(userId: BookingUserId, spaceId: BookingSpaceId, bookingId: BookingId): Promise<Result<null, BookingError>> {
        if (await this.bookingFinder.find(bookingId)) return new Err(BookingAlreadyExistsError.withId(bookingId));
        if (await this.spaceFinder.find(spaceId) === null) return new Err(BookingSpaceNotFoundError.withSpaceId(spaceId))
        if (await this.userFinder.find(userId) === null) return new Err(BookingUserNotFoundError.withUserId(userId))
        return new Ok(null)
    }
}

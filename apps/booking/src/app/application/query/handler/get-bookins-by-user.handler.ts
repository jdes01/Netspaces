import { Inject } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { BookingDTO } from '@netspaces/contracts';

import { BookingUserId } from '../../../domain/model/value-objects';
import {
    BOOKING_FINDER,
    BookingFinder,
} from '../../service/booking-finder.service';
import { GetBookingsByUserQuery } from '../get-bookings-by-user.query';

@QueryHandler(GetBookingsByUserQuery)
export class GetBookingsByUserHandler implements IQueryHandler {
    constructor(
        @Inject(BOOKING_FINDER)
        private readonly bookingFinder: BookingFinder,
    ) { }

    async execute(query: GetBookingsByUserQuery): Promise<Array<BookingDTO>> {
        return this.bookingFinder.findByUser(
            BookingUserId.fromString(query.userId),
        );
    }
}

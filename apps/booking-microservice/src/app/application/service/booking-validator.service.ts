import { BookingId, BookingSpaceId, BookingUserId } from '../../domain/model/value-objects';
import { Result } from 'neverthrow';
import { BookingError } from '../../domain/exception';

export const BOOKING_VALIDATOR = 'BOOKING_VALIDATOR';

export interface BookingValidator {
    validate(userId: BookingUserId, spaceId: BookingSpaceId, bookingId: BookingId): Promise<Result<null, BookingError>>
}

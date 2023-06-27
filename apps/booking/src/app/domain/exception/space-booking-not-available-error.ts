import { BookingSpaceId } from '../model/value-objects';
import { BookingError } from './booking-error';

export class SpaceBookingNotAvailableError extends BookingError {
  public static withSpaceId(id: BookingSpaceId): SpaceBookingNotAvailableError {
    return new SpaceBookingNotAvailableError(
      `Space with id ${id.value} is not available`,
    );
  }
}

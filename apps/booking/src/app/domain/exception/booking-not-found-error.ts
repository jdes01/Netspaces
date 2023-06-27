import { BookingId } from '../model/value-objects';
import { BookingError } from './booking-error';

export class BookingNotFoundError extends BookingError {
  public static withId(id: BookingId): BookingNotFoundError {
    return new BookingNotFoundError(`Booking with id ${id.value} not found`);
  }
}

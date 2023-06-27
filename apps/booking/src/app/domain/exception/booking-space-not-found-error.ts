import { BookingSpaceId } from '../model/value-objects';
import { BookingError } from './booking-error';

export class BookingSpaceNotFoundError extends BookingError {
  public static withSpaceId(id: BookingSpaceId): BookingSpaceNotFoundError {
    return new BookingSpaceNotFoundError(`Space with id ${id.value} not found`);
  }
}

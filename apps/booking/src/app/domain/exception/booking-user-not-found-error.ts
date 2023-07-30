import { BookingUserId } from '../model/value-objects';
import { BookingError } from './booking-error';

export class BookingUserNotFoundError extends BookingError {
  public static withUserId(id: BookingUserId): BookingUserNotFoundError {
    return new BookingUserNotFoundError(`User with id ${id.value} not found`);
  }

  public static withUserMail(mail: string): BookingUserNotFoundError {
    return new BookingUserNotFoundError(`User with mail ${mail} not found`);
  }
}

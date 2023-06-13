import { BookingId } from '../model/value-objects';
import { BookingError } from './booking-error';

export class BookingAlreadyExistsError extends BookingError {
	public static withId(id: BookingId): BookingAlreadyExistsError {
		return new BookingAlreadyExistsError(`Booking with id ${id.value} already exists`);
	}
}

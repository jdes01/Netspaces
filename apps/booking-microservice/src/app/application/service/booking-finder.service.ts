import { BookingDTO } from '@netspaces/contracts';

import { BookingDate, BookingId, BookingSpaceId } from '../../domain/model/value-objects';

export const BOOKING_FINDER = 'BOOKING_FINDER';

export interface BookingFinder {
	find(id: BookingId): Promise<BookingDTO | null>;
	findByDateForSpace(spaceId: BookingSpaceId, bookingDate: BookingDate): Promise<Array<BookingDTO>>;
	findBySpace(spaceId: BookingSpaceId): Promise<Array<BookingDTO>>;
	findSpaceUnavailableDates(spaceId: BookingSpaceId, spaceQuantity: number): Promise<Array<string>>;
}

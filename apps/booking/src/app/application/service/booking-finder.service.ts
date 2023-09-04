import { BookingDTO } from '@netspaces/contracts';

import {
  BookingDate,
  BookingId,
  BookingSpaceId,
  BookingUserId,
} from '../../domain/model/value-objects';

export const BOOKING_FINDER = 'BOOKING_FINDER';

export interface BookingFinder {
  find(id: BookingId): Promise<BookingDTO | null>;
  findByDateForSpace(
    spaceId: BookingSpaceId,
    bookingDate: BookingDate,
  ): Promise<Array<BookingDTO>>;
  findBySpace(spaceId: BookingSpaceId): Promise<Array<BookingDTO>>;
  findSpaceUnavailableDates(
    spaceId: BookingSpaceId,
    spaceQuantity: number,
  ): Promise<Array<string>>;
  findSpacePendingBookings(spaceId: BookingSpaceId): Promise<Array<BookingDTO>>;
  findSpaceAvailabilityByMonth(spaceId: BookingSpaceId, quantity: number, month: number, year: number): Promise<Array<[number, number]>>
  findByUser(userId: BookingUserId): Promise<Array<BookingDTO>>;
}

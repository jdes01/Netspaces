import { BookingDTO } from '@netspaces/contracts';

import { BookingId } from '../../domain/model/value-objects';

export const BOOKING_FINDER = 'BOOKING_FINDER';

export interface BookingFinder {
	find(id: BookingId): Promise<BookingDTO | null>;
}

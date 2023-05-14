import { BookingDTO } from '@netspaces/contracts';

import { BookingWorkspaceId } from '../../domain/model/value-objects';

export const BOOKING_FINDER = 'BOOKING_FINDER';

export interface BookingFinder {
    find(id: BookingWorkspaceId): Promise<BookingDTO | null>;
    // findAll(): Promise<Array<BookingDTO>>;
    // findByWorkspaceId(id: BookingWorkspaceId): Promise<Array<BookingDTO>>;
}

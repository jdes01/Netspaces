import { SpaceDTO } from '@netspaces/contracts';

import { BookingSpaceId } from '../../domain/model/value-objects';

export const SPACE_FINDER = 'SPACE_FINDER';

export interface SpaceFinder {
    find(id: BookingSpaceId): Promise<SpaceDTO | null>;
}

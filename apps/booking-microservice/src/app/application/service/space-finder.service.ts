import { SpaceDTO } from '@netspaces/contracts';

import { BookingSpaceId, BookingWorkspaceId } from '../../domain/model/value-objects';

export const SPACE_FINDER = 'SPACE_FINDER';

export interface SpaceFinder {
    find(id: BookingSpaceId): Promise<SpaceDTO | null>;
    findSpaceInWorkspace(workspaceId: BookingWorkspaceId, spaceId: BookingSpaceId): Promise<boolean>;
}

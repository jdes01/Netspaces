import { WorkspaceDTO } from '@netspaces/contracts';

import { BookingSpaceId, BookingWorkspaceId } from '../../domain/model/value-objects';

export const WORKSPACE_FINDER = 'WORKSPACE_FINDER';

export interface WorkspaceFinder {
    find(id: BookingWorkspaceId): Promise<WorkspaceDTO | null>;
}

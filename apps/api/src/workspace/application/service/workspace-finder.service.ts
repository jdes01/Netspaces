import { WorkspaceDTO } from '@netspaces/contracts';

import { WorkspaceId } from '../../domain/model/value-objects';
import { WorkspaceOwnerId } from '../../domain/model/value-objects/workspace-owner-id';

export const WORKSPACE_FINDER = 'WORKSPACE_FINDER';

export interface WorkspaceFinder {
	find(id: WorkspaceId): Promise<WorkspaceDTO | null>;
	findAll(): Promise<Array<WorkspaceDTO>>;
	findByOwnerId(id: WorkspaceOwnerId): Promise<Array<WorkspaceDTO>>;
}

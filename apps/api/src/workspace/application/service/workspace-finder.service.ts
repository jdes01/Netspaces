import { WorkspaceDTO } from '@netspaces/contracts';

import { WorkspaceId } from '../../domain/model/value-objects';
import { WorkspaceCompanyId } from '../../domain/model/value-objects/workspace-company-id';

export const WORKSPACE_FINDER = 'WORKSPACE_FINDER';

export interface WorkspaceFinder {
	find(id: WorkspaceId): Promise<WorkspaceDTO | null>;
	findAll(): Promise<Array<WorkspaceDTO>>;
	findByCompanyId(id: WorkspaceCompanyId): Promise<Array<WorkspaceDTO>>;
}

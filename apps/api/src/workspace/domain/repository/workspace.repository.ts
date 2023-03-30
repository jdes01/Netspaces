import { Nullable } from '@netspaces/domain';
import { Result } from 'ts-results';

import { WorkspaceError } from '../exception/workspace-error';
import { Workspace } from '../model';
import { WorkspaceId } from '../model/value-objects';

export interface WorkspaceRepository {
	find(workspaceId: WorkspaceId): Promise<Result<Nullable<Workspace>, WorkspaceError>>;
	save(workspace: Workspace): Promise<Result<null, WorkspaceError>>;
}

export const WORKSPACE_REPOSITORY = 'WORKSPACE_REPOSITORY';

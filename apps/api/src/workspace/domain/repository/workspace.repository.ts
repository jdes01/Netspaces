import { Nullable } from '@netspaces/domain';
import { Result } from 'ts-results';
import { Workspace } from '../model';
import { WorkspaceId } from '../model/value-objects';

export interface WorkspaceRepository {
    find(workspaceId: WorkspaceId): Promise<Nullable<Workspace>>;
    save(workspace: Workspace): Result<null, Error>;
}
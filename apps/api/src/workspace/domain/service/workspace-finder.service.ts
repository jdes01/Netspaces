import { WorkspaceDTO } from '@netspaces/contracts';
import { WorkspaceId } from '../model/value-objects';

export const WORKSPACE_FINDER = 'WORKSPACE_FINDER';

export interface WorkspaceFinder {
    findAll(): Promise<Array<WorkspaceDTO>>;
    find(id: WorkspaceId): Promise<WorkspaceDTO>;
}
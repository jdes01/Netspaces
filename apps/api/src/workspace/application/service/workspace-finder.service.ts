import { WorkspaceDTO } from '@netspaces/contracts';
import { WorkspaceId } from '../../domain/model/value-objects';

export const WORKSPACE_FINDER = 'WORKSPACE_FINDER';

export interface IWorkspaceFinder {
    findAll(): Promise<Array<WorkspaceDTO>>;
    find(id: WorkspaceId): Promise<WorkspaceDTO>;
}
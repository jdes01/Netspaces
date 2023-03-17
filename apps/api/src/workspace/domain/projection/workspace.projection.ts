import { WorkspaceReadModel } from '../read-model/workspace.read-model'

export interface WorkspaceProjection {
    save(workspace: WorkspaceReadModel): Promise<void>;
}

export const WORKSPACE_PROJECTION = 'WORKSPACE_PROJECTION';
import { Workspace } from "../workspace/domain/model";
import { WorkspaceId } from "../workspace/domain/model/value-objects";
import { WorkspaceRepository } from "../workspace/domain/service/repository.service";

export class InMemoryWorkspaceRepository implements WorkspaceRepository<Workspace, WorkspaceId> {
    public workspaces: Array<Workspace> = [];

    constructor(workspaces: Array<Workspace>) {
        this.workspaces = workspaces;
    }

    async find(id: WorkspaceId): Promise<Workspace | null> {
        const workspace = this.workspaces.find(workspace => workspace.id.equals(id));
        return workspace ? Promise.resolve(workspace) : Promise.resolve(null);
    }

    save(entity: Workspace): void {
        const index = this.workspaces.findIndex(workspace => workspace.id.equals(entity.id));
        if (index !== -1) {
            this.workspaces[index] = entity;
        } else {
            this.workspaces.push(entity);
        }
    }

    async delete(entity: Workspace): Promise<void> {
        const index = this.workspaces.findIndex(workspace => workspace.id.equals(entity.id));
        if (index !== -1) {
            this.workspaces.splice(index, 1);
        }
    }
}
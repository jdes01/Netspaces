import { WorkspaceDTO } from '@netspaces/contracts';
import { WorkspaceFinder } from '../workspace/application/service/workspace-finder.service';
import { WorkspaceId } from '../workspace/domain/model/value-objects';
import { WorkspaceCompanyId } from '../workspace/domain/model/value-objects/workspace-company-id';

export class InMemoryWorkspaceFinder implements WorkspaceFinder {
  private workspaces: WorkspaceDTO[] = [];

  constructor(workspaces: Array<WorkspaceDTO>) {
    this.workspaces = workspaces;
  }

  async find(id: WorkspaceId): Promise<WorkspaceDTO | null> {
    const workspace = this.workspaces.find(
      (workspace) => workspace._id === id.value,
    );
    return workspace || null;
  }

  async findAll(): Promise<WorkspaceDTO[]> {
    return this.workspaces;
  }

  async findByCompanyId(id: WorkspaceCompanyId): Promise<Array<WorkspaceDTO>> {
    return this.workspaces.filter(
      (workspace) => workspace.companyId === id.value,
    );
  }
}

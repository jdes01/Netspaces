import { Ok } from 'neverthrow';
import {
  WorkspaceDescription,
  WorkspaceId,
  WorkspaceLocation,
  WorkspaceName,
  WorkspaceService,
} from '../../domain/model/value-objects';

import { DeleteWorkspaceCommand } from '../command/delete-workspace.command';
import { DeleteWorkspaceHandler } from '../command/handler/delete-workspace.handler';
import { Workspace } from '../../domain/model';
import { WorkspaceCompanyId } from '../../domain/model/value-objects/workspace-company-id';
import { InMemoryWorkspaceRepository } from '../../../test';

describe('DeleteWorkspaceHandler', () => {
  let id: WorkspaceId;
  let companyId: WorkspaceCompanyId;
  let name: WorkspaceName;
  let description: WorkspaceDescription;
  let location: WorkspaceLocation;
  let services: Array<WorkspaceService>;
  let existingWorkspace: Workspace;
  let command: DeleteWorkspaceCommand;

  beforeEach(() => {
    id = WorkspaceId.fromString('e847261d-5539-49da-876d-bfc245e50974');
    companyId = WorkspaceCompanyId.fromString(
      '6cfa5a4f-c88d-431c-a925-b25a844f25db',
    );
    name = WorkspaceName.fromString('workspace name');
    description = WorkspaceDescription.fromString('description');
    location = new WorkspaceLocation('street', 'city', 'country');
    services = [];
    existingWorkspace = Workspace.add(
      id,
      companyId,
      name,
      description,
      location,
      services,
    );
    command = new DeleteWorkspaceCommand(id.value);
  });

  it('should delete an existing workspace successfully', async () => {
    const workspaceRepository = new InMemoryWorkspaceRepository([
      existingWorkspace,
    ]);
    const handler = new DeleteWorkspaceHandler(workspaceRepository);

    const result = await handler.execute(command);

    expect(result).toBeInstanceOf(Ok);
    expect(workspaceRepository.workspaces[0].deleted).toBe(true);
  });
});

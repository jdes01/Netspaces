import { WorkspaceId } from '../model/value-objects';
import { WorkspaceError } from './workspace-error';

export class WorkspaceNotFoundError extends WorkspaceError {
  public static withId(id: WorkspaceId): WorkspaceNotFoundError {
    return new WorkspaceNotFoundError(
      `Workspace with id ${id.value} not found`,
    );
  }
}

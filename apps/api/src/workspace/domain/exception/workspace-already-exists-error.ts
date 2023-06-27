import { WorkspaceId } from '../model/value-objects';
import { WorkspaceError } from './workspace-error';

export class WorkspaceAlreadyExistsError extends WorkspaceError {
  public static withId(id: WorkspaceId): WorkspaceAlreadyExistsError {
    return new WorkspaceAlreadyExistsError(
      `Workspace with id ${id.value} already exists`,
    );
  }
}

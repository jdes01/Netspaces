import { WorkspaceError } from './workspace-error';

export class WorkspaceServiceNotValidError extends WorkspaceError {
  public static withService(service: string): WorkspaceServiceNotValidError {
    return new WorkspaceServiceNotValidError(
      `Workspace service ${service} not valid`,
    );
  }
}

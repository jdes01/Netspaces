import { WorkspaceError } from "./workspace-error";

export class WorkspaceServiceNotVaidError extends WorkspaceError {
    public static withService(service: string): WorkspaceServiceNotVaidError {
        return new WorkspaceServiceNotVaidError(
            `Workspace service ${service} not valid`,
        );
    }
}

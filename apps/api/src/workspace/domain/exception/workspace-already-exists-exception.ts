import { WorkspaceId } from "../model/value-objects";
import { WorkspaceException } from "./workspace-exception";

export class WorkspaceAlreadyExistsException extends WorkspaceException {
    public static withString(id: WorkspaceId): WorkspaceAlreadyExistsException {
        return new WorkspaceAlreadyExistsException(
            `Workspace with id ${id.value} already exists`,
        );
    }
}

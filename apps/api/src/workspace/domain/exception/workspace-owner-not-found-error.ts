import { WorkspaceOwner } from '../model/value-objects/workspace-owner';
import { WorkspaceError } from './workspace-error';

export class WorkspaceOwnerNotFoundError extends WorkspaceError {
    public static withOwner(owner: WorkspaceOwner): WorkspaceOwnerNotFoundError {
        return new WorkspaceOwnerNotFoundError(`User with id ${owner.value} not found`);
    }
}

import { WorkspaceOwnerId } from '../model/value-objects/workspace-owner-id';
import { WorkspaceError } from './workspace-error';

export class WorkspaceOwnerNotFoundError extends WorkspaceError {
	public static withOwner(owner: WorkspaceOwnerId): WorkspaceOwnerNotFoundError {
		return new WorkspaceOwnerNotFoundError(`User with id ${owner.value} not found`);
	}
}

import { WorkspaceCompanyId } from '../model/value-objects/workspace-company-id';
import { WorkspaceError } from './workspace-error';

export class WorkspaceCompanyNotFoundError extends WorkspaceError {
	public static withCompany(companyId: WorkspaceCompanyId): WorkspaceCompanyNotFoundError {
		return new WorkspaceCompanyNotFoundError(`User with id ${companyId.value} not found`);
	}
}


import { ValueObject, WorkspaceServicesTypes } from '@netspaces/domain';

import { WorkspaceServiceNotValidError } from '../../exception/workspace-service-not-valid-error';
import { Err, Ok, Result } from 'neverthrow';

export class WorkspaceService extends ValueObject<{
	value: WorkspaceServicesTypes;
}> {
	public static fromString(service: string): Result<WorkspaceService, WorkspaceServiceNotValidError> {
		if (service in WorkspaceServicesTypes === false) {
			return new Err(WorkspaceServiceNotValidError.withService(service));
		}

		return new Ok(new WorkspaceService({
			value: WorkspaceServicesTypes[service],
		}));
	}

	public static fromStringList(services: Array<string>): Result<Array<WorkspaceService>, WorkspaceServiceNotValidError> {
		try {
			return new Ok(services.map((service) => new WorkspaceService({
				value: WorkspaceServicesTypes[service],
			})))
		} catch (e: any) {
			return new Err(new WorkspaceServiceNotValidError(e.message));
		}

	}

	get value(): WorkspaceServicesTypes {
		return this.props.value;
	}
}

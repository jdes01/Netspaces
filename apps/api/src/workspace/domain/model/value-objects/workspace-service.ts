// @ts-nocheck


import { ValueObject, WorkspaceServicesTypes } from '@netspaces/domain';

import { WorkspaceServiceNotValidError } from '../../exception/workspace-service-not-valid-error';
import { Err, Ok, Result } from 'ts-results';

export class WorkspaceService extends ValueObject<{
	value: WorkspaceServicesTypes;
}> {
	public static fromString(service: string): Result<WorkspaceService, WorkspaceServiceNotValidError> {
		if (service in WorkspaceServicesTypes === false) {
			return Err(WorkspaceServiceNotValidError.withService(service));
		}

		return Ok(new WorkspaceService({
			value: WorkspaceServicesTypes[service],
		}));
	}

	public static fromStringList(services: Array<string>): Result<Array<WorkspaceService>, WorkspaceServiceNotValidError> {
		try {
			return Ok(services.map((service) => new WorkspaceService({
				value: WorkspaceServicesTypes[service],
			})))
		} catch (e: any) {
			return Err(new WorkspaceServiceNotValidError(e.message));
		}

	}

	get value(): WorkspaceServicesTypes {
		return this.props.value;
	}
}

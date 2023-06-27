import { ValueObject, WorkspaceServicesTypes } from '@netspaces/domain';
import { Err, Ok, Result } from 'neverthrow';

import { WorkspaceServiceNotValidError } from '../../exception/workspace-service-not-valid-error';

export class WorkspaceService extends ValueObject<{
  value: WorkspaceServicesTypes;
}> {
  public static fromString(
    service: string,
  ): Result<WorkspaceService, WorkspaceServiceNotValidError> {
    if (service in WorkspaceServicesTypes === false) {
      return new Err(WorkspaceServiceNotValidError.withService(service));
    }

    return new Ok(
      new WorkspaceService({
        value: WorkspaceServicesTypes[service],
      }),
    );
  }

  public static fromStringList(
    services: Array<string>,
  ): Result<Array<WorkspaceService>, WorkspaceServiceNotValidError> {
    try {
      const workspaceServices = services.map((service) => {
        const serviceType = WorkspaceServicesTypes[service];
        if (serviceType === undefined) {
          throw new Error(service);
        }
        return new WorkspaceService({ value: serviceType });
      });

      return new Ok(workspaceServices);
    } catch (e: any) {
      return new Err(WorkspaceServiceNotValidError.withService(e.message));
    }
  }

  public static toStringList(services: Array<WorkspaceService>): Array<string> {
    return services.map((service) => service.value);
  }

  get value(): WorkspaceServicesTypes {
    return this.props.value;
  }
}

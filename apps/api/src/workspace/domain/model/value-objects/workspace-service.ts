import { ValueObject } from '@netspaces/domain';
import { WorkspaceServiceNotValidError } from '../../exception/workspace-service-not-valid-error';


export enum WorkspaceServicesTypes {
    WIFI = 'WIFI',
    KITCHEN = 'KITCHEN',
    COFFEE = 'COFFEE',
    PRINTER = 'PRINTER',
    PARKING = 'PARKING',
}

export class WorkspaceService extends ValueObject<{ value: WorkspaceServicesTypes }> {

    public static fromString(service: string): WorkspaceService {
        if (service in WorkspaceServicesTypes === false) {
            throw WorkspaceServiceNotValidError.withService(service);
        }

        return new WorkspaceService({ value: WorkspaceServicesTypes[service] });
    }


    get value(): WorkspaceServicesTypes {
        return this.props.value;
    }
}

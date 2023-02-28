import { StorableEvent } from 'event-sourcing-nestjs';
import { WorkspaceDescription, WorkspaceId, WorkspaceLocation, WorkspaceName } from '../model/value-objects';

export type WorkspaceCreationParams = { id: WorkspaceId, name: WorkspaceName, description: WorkspaceDescription, location: WorkspaceLocation }

export class WorkspaceWasCreated extends StorableEvent {

    eventAggregate: string = 'workspace';
    eventVersion: number = 1;

    readonly id: string;
    readonly name: string;
    readonly description: string;
    readonly streetName: string;
    readonly cityName: string;
    readonly countryName: string;

    constructor(params: WorkspaceCreationParams) {
        super();
        this.id = params.id.value;
        this.name = params.name.value;
        this.description = params.description.value;
        this.streetName = params.location.street.name;
        this.cityName = params.location.city.name;
        this.countryName = params.location.country.name;
    }
}
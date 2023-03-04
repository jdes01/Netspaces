import { StorableEvent } from 'event-sourcing-nestjs';
import { WorkspaceDescription, WorkspaceId, WorkspaceLocation, WorkspaceName, LocationCreationParams } from '../model/value-objects';

export type WorkspaceCreationParams = { id: WorkspaceId, name: WorkspaceName, description: WorkspaceDescription, location: WorkspaceLocation }

export class WorkspaceWasCreated extends StorableEvent {

    eventAggregate: string = 'workspace';
    eventVersion: number = 1;

    readonly id: string;
    readonly name: string;
    readonly description: string;
    readonly location: LocationCreationParams;

    constructor(params: WorkspaceCreationParams) {
        super();
        this.id = params.id.value;
        this.name = params.name.value;
        this.description = params.description.value;
        this.location = params.location;
    }
}
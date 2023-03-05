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

    constructor(id: string, name: string, description: string, location: LocationCreationParams) {
        super();
        this.id = id;
        this.name = name;
        this.description = description;
        this.location = location;
    }
}
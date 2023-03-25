import { AggregateRoot } from '@aulasoftwarelibre/nestjs-eventstore';

import { DeletionDate } from '@netspaces/domain'

import { WorkspaceId, WorkspaceName, WorkspaceLocation, WorkspaceDescription, WorkspaceService } from "./value-objects/";

import { WorkspaceWasCreatedEvent, WorkspaceWasDeleted } from '../event'

export class Workspace extends AggregateRoot {

    private _id: WorkspaceId;
    private _deleted: boolean;
    private _name: WorkspaceName;
    private _description: WorkspaceDescription;
    private _location: WorkspaceLocation;
    private _services: Array<WorkspaceService> = [];

    public static add(id: WorkspaceId, name: WorkspaceName, description: WorkspaceDescription, location: WorkspaceLocation, services: Array<WorkspaceService>): Workspace {

        const workspace = new Workspace();

        const event = new WorkspaceWasCreatedEvent(id.value, name.value, description.value, location.street, location.city, location.country, services.map(service => service.value));

        workspace.apply(event);

        return workspace;
    }

    private onWorkspaceWasCreatedEvent(event: WorkspaceWasCreatedEvent): void {
        this._id = WorkspaceId.fromString(event.id);
        this._name = WorkspaceName.fromString(event.name)
        this._description = WorkspaceDescription.fromString(event.description)
        this._location = new WorkspaceLocation(event.street, event.city, event.country)
        this._services = event.services.map(service => WorkspaceService.fromString(service))
        this._deleted = null;
    }


    private onWorkspacerWasDeletedEvent(event: WorkspaceWasDeleted): void {
        this._deleted = true;
    }

    public aggregateId(): string {
        return this._id.value;
    }

    public get id(): WorkspaceId {
        return this._id;
    }

    public get deleted(): boolean {
        return this._deleted
    }

    public get name(): WorkspaceName {
        return this._name
    }

    public get description(): WorkspaceDescription {
        return this._description
    }

    public get location(): WorkspaceLocation {
        return this._location
    }

    public get services(): Array<WorkspaceService> {
        return this._services
    }

    public add_service(service: WorkspaceService) {
        this._services.push(service)
    }
}
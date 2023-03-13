import { AggregateRoot } from "@nestjs/cqrs";

import { DeletionDate } from '@netspaces/domain'

import { WorkspaceId, WorkspaceName, WorkspaceLocation, WorkspaceDescription, WorkspaceService } from "./value-objects/";

import { WorkspaceWasCreatedEvent, WorkspaceWasDeleted } from '../event'

export class Workspace extends AggregateRoot {

    private _id: WorkspaceId;
    private _deleted: DeletionDate;
    private _name: WorkspaceName;
    private _description: WorkspaceDescription;
    private _location: WorkspaceLocation;
    private _services: Array<WorkspaceService> = [];

    private constructor() {
        super();
    }

    public static add(id: WorkspaceId, name: WorkspaceName, description: WorkspaceDescription, location: WorkspaceLocation): Workspace {

        const workspace = new Workspace();

        const event = new WorkspaceWasCreatedEvent(id.value, name.value, description.value, location);

        workspace.apply(event);

        return workspace;
    }

    private onWorkspaceWasCreated(event: WorkspaceWasCreatedEvent): void {
        this._id = WorkspaceId.fromString(event.id);
        this._name = WorkspaceName.fromString(event.name)
        this._description = WorkspaceDescription.fromString(event.description)
        this._location = WorkspaceLocation.create(event.location)
        this._deleted = null;
    }


    private onWorkspacerWasDeleted(event: WorkspaceWasDeleted): void {
        this._deleted = event.createdOn;
    }

    public get id(): WorkspaceId {
        return this._id;
    }

    public get deleted(): DeletionDate | null {
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
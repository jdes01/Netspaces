import { AggregateRoot } from "@nestjs/cqrs";

import { DeletionDate } from '@netspaces/domain'

import { WorkspaceId, WorkspaceName, WorkspaceLocation, Street, City, Country, LocationCreationParams, WorkspaceDescription } from "./value-objects/";

import { WorkspaceWasCreated, WorkspaceWasDeleted } from '../event'

import { WorkspaceCreationParams } from "../event/workspace-was-created"



export class Workspace extends AggregateRoot {

    private _id: WorkspaceId;
    private _deleted: DeletionDate;
    private _name: WorkspaceName;
    private _description: WorkspaceDescription;
    private _location: WorkspaceLocation;

    private constructor() {
        super();
    }

    public static add(id: WorkspaceId, name: WorkspaceName, description: WorkspaceDescription, location: WorkspaceLocation): Workspace {

        const workspace = new Workspace();

        const event_params: WorkspaceCreationParams = { id: id, name: name, description: description, location: location }

        const event = new WorkspaceWasCreated(event_params);

        workspace.apply(event);

        return workspace;
    }

    private onWorkspaceWasCreated(event: WorkspaceWasCreated): void {
        this._id = WorkspaceId.fromString(event.id);
        this._name = WorkspaceName.fromString(event.name)
        this._description = WorkspaceDescription.fromString(event.description)

        const location_params: LocationCreationParams = {
            street: { name: event.streetName },
            city: { name: event.cityName },
            country: { name: event.countryName }
        }

        this._location = WorkspaceLocation.create(location_params)
        this._deleted = null;
    }


    private onWorkspacerWasDeleted(event: WorkspaceWasDeleted): void {
        this._deleted = event.createdOn;
    }

    public get id(): WorkspaceId {
        return this._id;
    }
}
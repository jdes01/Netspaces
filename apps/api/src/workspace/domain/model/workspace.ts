import { AggregateRoot } from "@nestjs/cqrs";

import { DeletionDate } from '@netspaces/domain'

import { WorkspaceId } from "./value-objects/";

import { WorkspaceWasCreated, WorkspaceWasDeleted } from '../event'

export class Workspace extends AggregateRoot {

    private _id: WorkspaceId;
    private _deleted: DeletionDate;

    private constructor() {
        super();
    }

    public static add(params: { id: WorkspaceId }): Workspace {

        const workspace = new Workspace();

        const event = new WorkspaceWasCreated({
            id: params.id.value,
        });

        workspace.apply(event);

        return workspace;
    }

    private onWorkspaceWasCreated(event: WorkspaceWasCreated): void {
        this._id = WorkspaceId.fromString(event.id);
        this._deleted = null;
    }


    private onWorkspacerWasDeleted(event: WorkspaceWasDeleted): void {
        this._deleted = event.createdOn;
    }

    public get id(): WorkspaceId {
        return this._id;
    }
}
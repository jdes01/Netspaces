import { StorableEvent } from 'event-sourcing-nestjs';

type WorkspaceWasCreatedParams = { id: string }

export class WorkspaceWasCreated extends StorableEvent {

    eventAggregate: string = 'workspace';
    eventVersion: number = 1;

    readonly id: string;

    constructor(params: WorkspaceWasCreatedParams) {
        super();
        this.id = params.id;
    }
}
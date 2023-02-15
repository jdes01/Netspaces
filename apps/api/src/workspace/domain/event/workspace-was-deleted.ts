import { StorableEvent } from 'event-sourcing-nestjs';

export class WorkspaceWasDeleted extends StorableEvent {

    eventAggregate: string = 'workspace';
    eventVersion: number = 1;

    public readonly createdOn: Date = new Date();

    constructor(public readonly id: string) {
        super();
    }
}

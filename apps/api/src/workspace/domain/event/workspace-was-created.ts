import { Event } from '@aulasoftwarelibre/nestjs-eventstore';
import { WorkspaceDescription, WorkspaceId, WorkspaceLocation, WorkspaceName, WorkspaceService } from '../model/value-objects';

export type WorkspaceCreationParams = { id: WorkspaceId, name: WorkspaceName, description: WorkspaceDescription, location: WorkspaceLocation }

export class WorkspaceWasCreatedEvent extends Event {

    constructor(
        public readonly id: string,
        public readonly name: string,
        public readonly description: string,
        public readonly street: string,
        public readonly city: string,
        public readonly country: string,
        public readonly services: Array<string>,
    ) {
        super(id, { _id: id, name, description, street, city, country, services });
    }
}
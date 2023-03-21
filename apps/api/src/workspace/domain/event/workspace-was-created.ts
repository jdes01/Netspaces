import { Event } from '@aulasoftwarelibre/nestjs-eventstore';
import { CreateWorkspaceDTO } from '@netspaces/contracts';
import { WorkspaceDescription, WorkspaceId, WorkspaceLocation, WorkspaceName } from '../model/value-objects';

export type WorkspaceCreationParams = { id: WorkspaceId, name: WorkspaceName, description: WorkspaceDescription, location: WorkspaceLocation }

export class WorkspaceWasCreatedEvent extends Event<CreateWorkspaceDTO> {

    constructor(
        public readonly id: string,
        public readonly name: string,
        public readonly description: string,
        public readonly street: string,
        public readonly city: string,
        public readonly country: string,
    ) {
        super(id, { _id: id, name, description, street, city, country });
    }
}
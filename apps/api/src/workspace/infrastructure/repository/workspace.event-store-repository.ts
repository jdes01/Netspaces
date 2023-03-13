import { Injectable } from '@nestjs/common';
import { Nullable } from '@netspaces/domain';
import { EventStore, StoreEventPublisher } from 'event-sourcing-nestjs';
import { Ok, Result } from 'ts-results';

import { WorkspaceError } from '../../domain/exception';
import { Workspace } from '../../domain/model';
import { WorkspaceId } from '../../domain/model/value-objects';
import { WorkspaceRepository } from '../../domain/repository';

@Injectable()
export class WorkspaceEventStoreRepository implements WorkspaceRepository {
    constructor(private readonly publisher: StoreEventPublisher, private readonly events: EventStore) { }

    async find(workspaceId: WorkspaceId): Promise<Result<Nullable<Workspace>, WorkspaceError>> {
        const events = await this.events.getEvents('workspace', workspaceId.value);

        if (events.length == 0) {
            return Ok(null);
        }

        const workspace: Workspace = Reflect.construct(Workspace, []);
        workspace.loadFromHistory(events);

        return Ok(workspace);
    }

    async save(workspace: Workspace): Promise<Result<null, WorkspaceError>> {
        workspace = this.publisher.mergeObjectContext(workspace);
        workspace.commit();

        return Ok(null)
    }
}
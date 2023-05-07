import { Inject } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { WorkspaceDTO } from '@netspaces/contracts';

import { WorkspaceId } from '../../../domain/model/value-objects';
import { WORKSPACE_FINDER, WorkspaceFinder } from '../../service/workspace-finder.service';
import { GetWorkspacesByOwnerIdQuery } from '../get-workspaces-by-owner-id.query';
import { WorkspaceOwnerId } from '../../../domain/model/value-objects/workspace-owner-id';

@QueryHandler(GetWorkspacesByOwnerIdQuery)
export class GetWorkspacesByOwnerIdHandler implements IQueryHandler {
    constructor(
        @Inject(WORKSPACE_FINDER)
        private readonly workspaceFinder: WorkspaceFinder,
    ) { }

    async execute(query: GetWorkspacesByOwnerIdQuery): Promise<Array<WorkspaceDTO>> {
        return this.workspaceFinder.findByOwnerId(WorkspaceOwnerId.fromString(query.id));
    }
}

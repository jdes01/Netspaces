import { Inject } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Ok, Result } from 'ts-results';
import { WorkspaceError } from '../../../domain/exception/workspace-error';
import { WorkspaceProjection, WORKSPACE_PROJECTION } from '../../../domain/projection';
import { WorkspaceReadModel } from '../../../domain/read-model/workspace.read-model';
import { GetWorkspacesQuery } from '../get-workspaces.query';

@QueryHandler(GetWorkspacesQuery)
export class GetWorkspacesHandler implements IQueryHandler<GetWorkspacesQuery> {
    constructor(
        @Inject(WORKSPACE_PROJECTION) private readonly workspaceProjection: WorkspaceProjection,
    ) { }

    async execute(query: GetWorkspacesQuery): Promise<Result<Array<WorkspaceReadModel>, WorkspaceError>> {
        const workspaces = await this.workspaceProjection.getAll()
        return Ok(workspaces)
    }
}
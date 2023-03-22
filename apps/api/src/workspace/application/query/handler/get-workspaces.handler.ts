import { Inject } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { WorkspaceDTO } from '@netspaces/contracts';
import { WORKSPACE_FINDER, WorkspaceFinder } from '../../../domain/service/workspace-finder.service';
import { GetWorkspacesQuery } from '../get-workspaces.query';

@QueryHandler(GetWorkspacesQuery)
export class GetWorkspacesHandler implements IQueryHandler {
    constructor(@Inject(WORKSPACE_FINDER) private readonly workspaceFinder: WorkspaceFinder) { }

    async execute(query: GetWorkspacesQuery): Promise<Array<WorkspaceDTO>> {
        return this.workspaceFinder.findAll()
    }
}
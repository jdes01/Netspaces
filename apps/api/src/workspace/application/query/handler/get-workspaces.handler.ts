import { Inject } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { WorkspaceDTO } from '@netspaces/contracts';
import { IWorkspaceFinder, WORKSPACE_FINDER } from '../../service/workspace-finder.service';
import { GetWorkspacesQuery } from '../get-workspaces.query';

@QueryHandler(GetWorkspacesQuery)
export class GetWorkspacesHandler implements IQueryHandler {
    constructor(@Inject(WORKSPACE_FINDER) private readonly workspaceFinder: IWorkspaceFinder) { }

    async execute(query: GetWorkspacesQuery): Promise<Array<WorkspaceDTO>> {
        return this.workspaceFinder.findAll()
    }
}
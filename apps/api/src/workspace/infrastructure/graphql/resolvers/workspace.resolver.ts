import { Resolver, Query } from '@nestjs/graphql'

import { WorkspaceService } from '../../service/workspace.service'
import { WorkspaceDTO } from '@netspaces/contracts'

@Resolver('Workspace')
export class WorkspaceResolver {
    constructor(private readonly workspaceService: WorkspaceService) { }

    @Query('workspaces')
    async workspaces(): Promise<WorkspaceDTO[]> {
        return await this.workspaceService.getWorkspaces();
    }
}
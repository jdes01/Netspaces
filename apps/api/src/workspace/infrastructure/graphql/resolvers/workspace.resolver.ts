import { Args, Query, Resolver } from '@nestjs/graphql';
import { WorkspaceDTO } from '@netspaces/contracts';

import { WorkspaceService } from '../../service/workspace.service';
import { Workspace } from '../schema/workspace.graphql-model';

@Resolver((_of) => Workspace)
export class WorkspaceResolver {
	constructor(private readonly workspaceService: WorkspaceService) {}

	@Query((_returns) => [Workspace])
	async workspaces(): Promise<WorkspaceDTO[]> {
		return await this.workspaceService.getWorkspaces();
	}

	@Query((_returns) => Workspace)
	async workspace(@Args('id', { type: () => String }) id: string): Promise<WorkspaceDTO> {
		return await this.workspaceService.getWorkspaceById(id);
	}
}

import { Args, Query, Resolver, ResolveField, Parent } from '@nestjs/graphql';
import { SpaceDTO, WorkspaceDTO } from '@netspaces/contracts';
import { Space } from '../../../../space/infrastructure/graphql/schema/space.graphql-model'


import { WorkspaceService } from '../../service/workspace.service';
import { Workspace } from '../schema/workspace.graphql-model';
import { SpaceService } from 'apps/api/src/space/infrastructure/service/space.service';

@Resolver((_of: any) => Workspace)
export class WorkspaceResolver {
	constructor(private readonly workspaceService: WorkspaceService, private readonly spaceService: SpaceService) { }

	@Query((_returns) => [Workspace])
	async workspaces(): Promise<WorkspaceDTO[]> {
		return await this.workspaceService.getWorkspaces();
	}

	@Query((_returns) => Workspace)
	async workspace(@Args('id', { type: () => String }) id: string): Promise<WorkspaceDTO> {
		return await this.workspaceService.getWorkspaceById(id);
	}

	@ResolveField(() => [Space])
	async spaces(@Parent() workspace: Workspace): Promise<SpaceDTO[]> {
		return this.spaceService.getSpacesByWorkspaceId(workspace._id);
	}
}

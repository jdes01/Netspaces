import { Args, Mutation, Parent, Query, ResolveField, ResolveReference, Resolver } from '@nestjs/graphql';
import { SpaceDTO, WorkspaceDTO } from '@netspaces/contracts';
import { GraphQLError } from 'graphql';

import { SpaceService } from '../../../../space/infrastructure//service/space.service';
import { Space } from '../../../../space/infrastructure/graphql/schema/space.graphql-model';
import { WorkspaceService } from '../../service/workspace.service';
import { Workspace, WorkspaceInput } from '../schema/workspace.graphql-model';

@Resolver((_of: any) => Workspace)
export class WorkspaceResolver {
	constructor(
		private readonly workspaceService: WorkspaceService,
		private readonly spaceService: SpaceService
	) { }

	@Query((_returns) => [Workspace])
	async workspaces(): Promise<WorkspaceDTO[]> {
		return await this.workspaceService.getWorkspaces();
	}

	@Query((_returns) => Workspace, { nullable: true })
	async workspace(@Args('id', { type: () => String }) id: string): Promise<WorkspaceDTO> {
		return await this.workspaceService.getWorkspaceById(id);
	}

	@ResolveReference()
	async resolveReference(reference: { __typename: string; _id: string }): Promise<WorkspaceDTO> {
		return await this.workspaceService.getWorkspaceById(reference._id);
	}

	@Query((_returns) => [Workspace], { nullable: true })
	async workspacesByCompanyId(@Args('id', { type: () => String }) id: string): Promise<WorkspaceDTO[]> {
		return await this.workspaceService.getWorkspacesByCompanyId(id);
	}

	@ResolveField(() => [Space])
	async spaces(@Parent() workspace: Workspace): Promise<SpaceDTO[]> {
		return this.spaceService.getSpacesByWorkspaceId(workspace._id);
	}

	@Mutation((_returns) => String)
	async createWorkspace(@Args('workspaceInput') workspaceInput: WorkspaceInput): Promise<string> {
		const createdWorkspaceResult = await this.workspaceService.createWorkspace(
			workspaceInput._id,
			workspaceInput.companyId,
			workspaceInput.name,
			workspaceInput.description,
			workspaceInput.street,
			workspaceInput.city,
			workspaceInput.country,
			workspaceInput.services,
		);

		return createdWorkspaceResult.match<string>(
			(_) => {
				return 'Workspace created successfully';
			},
			(err) => {
				throw new GraphQLError(err.message);
			},
		);
	}
}

import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { SpaceDTO } from '@netspaces/contracts';
import { GraphQLError } from 'graphql';

import { SpaceService } from '../../service/space.service';
import { Space, SpaceInput } from '../schema/space.graphql-model';

@Resolver((_of: any) => Space)
export class SpaceResolver {
	constructor(private readonly spaceService: SpaceService) {}

	@Query((_returns) => [Space])
	async spaces(): Promise<SpaceDTO[]> {
		return await this.spaceService.getSpaces();
	}

	@Query((_returns) => Space, { nullable: true })
	async space(@Args('id', { type: () => String }) id: string): Promise<SpaceDTO> {
		return await this.spaceService.getSpaceById(id);
	}

	@Mutation((_returns) => String)
	async createSpace(@Args('spaceInput') spaceInput: SpaceInput): Promise<string> {
		const createdSpaceResult = await this.spaceService.createSpace(
			spaceInput._id,
			spaceInput.workspaceId,
			spaceInput.name,
			spaceInput.quantity,
			spaceInput.seats,
			spaceInput.amenities,
		);

		return createdSpaceResult.match<string>(
			(_) => {
				return 'Space created successfully';
			},
			(err) => {
				throw new GraphQLError(err.message);
			},
		);
	}
}

import { Args, Query, Resolver } from '@nestjs/graphql';
import { SpaceDTO } from '@netspaces/contracts';

import { SpaceService } from '../../service/space.service';
import { Space } from '../schema/space.graphql-model';

@Resolver((_of: any) => Space)
export class SpaceResolver {
	constructor(private readonly spaceService: SpaceService) { }

	@Query((_returns) => [Space])
	async spaces(): Promise<SpaceDTO[]> {
		return await this.spaceService.getSpaces();
	}

	@Query((_returns) => Space)
	async space(@Args('id', { type: () => String }) id: string): Promise<SpaceDTO> {
		return await this.spaceService.getSpaceById(id);
	}
}

import { Query, Resolver } from '@nestjs/graphql';
import { SpaceDTO } from '@netspaces/contracts';

import { SpaceService } from '../../service/space.service';
import { Space } from '../schema/space.graphql-model';

@Resolver((_of) => Space)
export class SpaceResolver {
	constructor(private readonly workspaceService: SpaceService) {}

	@Query((_returns) => [Space])
	async spaces(): Promise<SpaceDTO[]> {
		return await this.workspaceService.getSpaces();
	}
}

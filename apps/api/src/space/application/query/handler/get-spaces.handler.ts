import { Inject } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { SpaceDTO } from '@netspaces/contracts';

import { SPACE_FINDER, SpaceFinder } from '../../service/space-finder.service';
import { GetSpacesQuery } from '../get-spaces.query';

@QueryHandler(GetSpacesQuery)
export class GetSpacesHandler implements IQueryHandler {
	constructor(@Inject(SPACE_FINDER) private readonly spaceFinder: SpaceFinder) {}

	async execute(query: GetSpacesQuery): Promise<Array<SpaceDTO>> {
		return this.spaceFinder.findAll();
	}
}

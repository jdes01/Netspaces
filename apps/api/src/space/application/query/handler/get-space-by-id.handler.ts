import { Inject } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { SpaceDTO } from '@netspaces/contracts';
import { SpaceId } from '../../../domain/model/value-objects';
import { SPACE_FINDER, SpaceFinder } from '../../service/space-finder.service';
import { GetSpaceByIdQuery } from '../get-space-by-id.query';

@QueryHandler(GetSpaceByIdQuery)
export class GetSpaceByIdHandler implements IQueryHandler {
    constructor(@Inject(SPACE_FINDER) private readonly spaceFinder: SpaceFinder) { }

    async execute(query: GetSpaceByIdQuery): Promise<SpaceDTO> {
        return this.spaceFinder.find(SpaceId.fromString(query.id))
    }
}
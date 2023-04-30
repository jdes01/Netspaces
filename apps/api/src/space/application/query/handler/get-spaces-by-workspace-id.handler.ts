import { Inject } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { SpaceDTO } from '@netspaces/contracts';

import { SPACE_FINDER, SpaceFinder } from '../../service/space-finder.service';
import { GetSpacesByWorkspaceIdQuery } from '../get-spaces-by-workspace-id.query';
import { WorkspaceId } from 'apps/api/src/workspace/domain/model/value-objects';

@QueryHandler(GetSpacesByWorkspaceIdQuery)
export class GetSpacesByWorkspaceIdHandler implements IQueryHandler {
    constructor(@Inject(SPACE_FINDER) private readonly spaceFinder: SpaceFinder) { }

    async execute(query: GetSpacesByWorkspaceIdQuery): Promise<Array<SpaceDTO>> {
        return this.spaceFinder.findByWorkspaceId(WorkspaceId.fromString(query.id));
    }
}

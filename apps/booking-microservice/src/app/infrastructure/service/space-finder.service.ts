import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { SpaceDTO } from '@netspaces/contracts';
import { Model } from 'mongoose';

import { SpaceFinder } from '../../application/service/space-finder.service';
import { BookingSpaceId, BookingWorkspaceId } from '../../domain/model/value-objects';
import { SPACE_PROJECTION, SpaceDocument } from '../projection/schema/space.schema';

@Injectable()
export class MongoDBSpaceFinder implements SpaceFinder {
    constructor(
        @InjectModel(SPACE_PROJECTION)
        private readonly spaceProjection: Model<SpaceDocument>,
    ) { }

    find(id: BookingSpaceId): Promise<SpaceDTO | null> {
        return this.spaceProjection.findById(id.value).exec();
    }

    async findSpaceInWorkspace(workspaceId: BookingWorkspaceId, spaceId: BookingSpaceId): Promise<boolean> {
        const spaceDTO = await this.spaceProjection.findById(spaceId.value).exec();
        return spaceDTO.workspaceId === workspaceId.value
    }

}

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { SpaceDTO } from '@netspaces/contracts';
import { Model } from 'mongoose';

import { SpaceFinder } from '../../application/service/space-finder.service';
import { SpaceId } from '../../domain/model/value-objects';
import { SPACE_PROJECTION, SpaceDocument } from '../projection';
import { WorkspaceId } from 'apps/api/src/workspace/domain/model/value-objects';

@Injectable()
export class MongoDBSpaceFinder implements SpaceFinder {
	constructor(
		@InjectModel(SPACE_PROJECTION)
		private readonly spaceProjection: Model<SpaceDocument>,
	) { }

	findAll(): Promise<SpaceDTO[]> {
		return this.spaceProjection.find().exec();
	}

	find(id: SpaceId): Promise<SpaceDTO> {
		return this.spaceProjection.findById(id.value).exec();
	}

	findByWorkspaceId(id: WorkspaceId): Promise<SpaceDTO> {
		return this.spaceProjection.find({ workspaceId: id.value });
	}
}

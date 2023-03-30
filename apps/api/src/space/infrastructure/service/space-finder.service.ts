import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { SpaceDTO } from '@netspaces/contracts';
import { Model } from 'mongoose';

import { SpaceFinder } from '../../application/service/space-finder.service';
import { SpaceId } from '../../domain/model/value-objects';
import { SPACE_PROJECTION, SpaceDocument } from '../projection';

@Injectable()
export class MongoDBSpaceFinder implements SpaceFinder {
	constructor(
		@InjectModel(SPACE_PROJECTION)
		private readonly spaceProjection: Model<SpaceDocument>,
	) {}

	findAll(): Promise<SpaceDTO[]> {
		return this.spaceProjection.find().exec();
	}

	find(id: SpaceId): Promise<SpaceDTO> {
		return this.spaceProjection.findById(id.value).exec();
	}
}

import { Controller, Logger } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';
import { InjectModel } from '@nestjs/mongoose';
import { SPACE_WAS_CREATED_MESSAGE, SpaceWasCreatedMessage } from '@netspaces/contracts';
import { Model } from 'mongoose';

import { SPACE_PROJECTION, SpaceDocument } from './schema/space.schema';

@Controller()
export class SpaceWasCreatedProjection {
	constructor(
		@InjectModel(SPACE_PROJECTION)
		private readonly spaceProjection: Model<SpaceDocument>,
	) {}

	@EventPattern(SPACE_WAS_CREATED_MESSAGE)
	async handle(message: SpaceWasCreatedMessage) {
		const space = new this.spaceProjection({
			...message,
		});
		await space.save();

		Logger.log(`Space ${message._id} stored`);
	}
}

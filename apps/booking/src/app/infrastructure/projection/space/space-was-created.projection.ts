import { Controller, Inject } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';
import { InjectModel } from '@nestjs/mongoose';
import { SPACE_WAS_CREATED_MESSAGE, SpaceWasCreatedMessage } from '@netspaces/contracts';
import { Model } from 'mongoose';

import { SPACE_PROJECTION, SpaceDocument } from '../schema/space.schema';

import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';

@Controller()
export class SpaceWasCreatedProjection {
	constructor(
		@InjectModel(SPACE_PROJECTION)
		private readonly spaceProjection: Model<SpaceDocument>,
		@Inject(WINSTON_MODULE_PROVIDER)
		private readonly logger: Logger,
	) { }

	@EventPattern(SPACE_WAS_CREATED_MESSAGE)
	async handle(message: SpaceWasCreatedMessage) {
		const space = new this.spaceProjection({
			...message,
		});
		await space.save();

		this.logger.info("Space stored", { userId: message._id });
	}
}

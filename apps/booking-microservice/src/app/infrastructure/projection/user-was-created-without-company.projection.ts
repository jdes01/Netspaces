import { Controller, Logger } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';
import { InjectModel } from '@nestjs/mongoose';
import { USER_WAS_CREATED_WITHOUT_COMPANY_MESSAGE, UserWasCreatedWithoutCompanyMessage } from '@netspaces/contracts';
import { Model } from 'mongoose';

import { USER_PROJECTION, UserDocument } from './schema/user.schema';

@Controller()
export class UserWasCreatedWithoutCompanyProjection {
	constructor(
		@InjectModel(USER_PROJECTION)
		private readonly userProjection: Model<UserDocument>,
	) { }

	@EventPattern(USER_WAS_CREATED_WITHOUT_COMPANY_MESSAGE)
	async handle(message: UserWasCreatedWithoutCompanyMessage) {
		const user = new this.userProjection({
			...message,
		});
		await user.save();

		Logger.log(`User ${message._id} stored`);
	}
}

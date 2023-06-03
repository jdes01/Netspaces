import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { UserWasCreatedWithoutCompanyEvent } from '../../domain/event';
import { USER_PROJECTION, UserDocument } from './user.schema';

@EventsHandler(UserWasCreatedWithoutCompanyEvent)
export class UserWasCreatedWithoutCompanyProjection implements IEventHandler<UserWasCreatedWithoutCompanyEvent> {
	constructor(
		@InjectModel(USER_PROJECTION)
		private readonly userProjection: Model<UserDocument>,
	) { }

	async handle(event: UserWasCreatedWithoutCompanyEvent) {
		const user = new this.userProjection({
			...event.payload,
		});
		await user.save();
	}
}

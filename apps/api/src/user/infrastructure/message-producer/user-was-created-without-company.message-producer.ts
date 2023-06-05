import { Inject, Logger } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { ClientKafka } from '@nestjs/microservices';
import { USER_WAS_CREATED_WITHOUT_COMPANY_MESSAGE } from '@netspaces/contracts';

import { UserWasCreatedWithoutCompanyEvent } from '../../domain/event';

@EventsHandler(UserWasCreatedWithoutCompanyEvent)
export class UserWasCreatedWithoutCompanyMessageProducer implements IEventHandler<UserWasCreatedWithoutCompanyEvent> {
	constructor(
		@Inject('DATASERVICE')
		private readonly userProducerClient: ClientKafka,
	) { }

	async handle(event: UserWasCreatedWithoutCompanyEvent) {
		this.userProducerClient.emit(USER_WAS_CREATED_WITHOUT_COMPANY_MESSAGE, JSON.stringify(event.payload));
	}
}

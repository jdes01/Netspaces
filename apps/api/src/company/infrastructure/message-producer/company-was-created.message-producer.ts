import { Inject, Logger } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { ClientKafka } from '@nestjs/microservices';
import { COMPANY_WAS_CREATED_MESSAGE } from '@netspaces/contracts';

import { CompanyWasCreatedEvent } from '../../domain/event';

@EventsHandler(CompanyWasCreatedEvent)
export class CompanyWasCreatedMessageProducer implements IEventHandler<CompanyWasCreatedEvent> {
	constructor(
		@Inject('DATASERVICE')
		private readonly companyProducerClient: ClientKafka,
	) { }

	async handle(event: CompanyWasCreatedEvent) {
		this.companyProducerClient.emit(COMPANY_WAS_CREATED_MESSAGE, JSON.stringify(event.payload));
		Logger.log(`Company ${event.payload._id} was created message was sent`);
	}
}

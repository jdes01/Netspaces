import { Inject } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { ClientKafka } from '@nestjs/microservices';
import { USER_WAS_CREATED_WITH_COMPANY_MESSAGE } from '@netspaces/contracts';

import { UserWasCreatedWithCompanyEvent } from '../../domain/event';

@EventsHandler(UserWasCreatedWithCompanyEvent)
export class UserWasCreatedWithCompanyMessageProducer implements IEventHandler<UserWasCreatedWithCompanyEvent> {
    constructor(
        @Inject('DATASERVICE')
        private readonly userProducerClient: ClientKafka,
    ) { }

    async handle(event: UserWasCreatedWithCompanyEvent) {
        this.userProducerClient.emit(USER_WAS_CREATED_WITH_COMPANY_MESSAGE, JSON.stringify(event.payload));
    }
}

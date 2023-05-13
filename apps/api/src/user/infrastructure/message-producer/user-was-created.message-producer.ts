import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

import { UserWasCreatedEvent } from '../../domain/event';
import { ClientKafka } from '@nestjs/microservices';
import { Inject, Logger } from '@nestjs/common';
import { USER_WAS_CREATED_MESSAGE } from '@netspaces/contracts';


@EventsHandler(UserWasCreatedEvent)
export class UserWasCreatedMessageProducer implements IEventHandler<UserWasCreatedEvent> {
    constructor(
        @Inject('DATASERVICE')
        private readonly userProducerClient: ClientKafka
    ) { }

    async handle(event: UserWasCreatedEvent) {
        this.userProducerClient.emit(USER_WAS_CREATED_MESSAGE, JSON.stringify(event.payload))
        Logger.log(`User ${event.payload._id} was created message was sent`)
    }
}

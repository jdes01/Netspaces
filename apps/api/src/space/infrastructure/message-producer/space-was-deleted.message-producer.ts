import { Inject } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { ClientKafka } from '@nestjs/microservices';
import { SPACE_WAS_DELETED_MESSAGE } from '@netspaces/contracts';

import { SpaceWasDeletedEvent } from '../../domain/event';

@EventsHandler(SpaceWasDeletedEvent)
export class SpaceWasDeletedMessageProducer implements IEventHandler<SpaceWasDeletedEvent> {
    constructor(
        @Inject('DATASERVICE')
        private readonly spaceProducerClient: ClientKafka,
    ) { }

    async handle(event: SpaceWasDeletedEvent) {
        this.spaceProducerClient.emit(SPACE_WAS_DELETED_MESSAGE, JSON.stringify(event.payload));
    }
}

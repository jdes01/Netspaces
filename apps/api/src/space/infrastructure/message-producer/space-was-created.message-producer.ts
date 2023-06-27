import { Inject } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { ClientKafka } from '@nestjs/microservices';
import { SPACE_WAS_CREATED_MESSAGE } from '@netspaces/contracts';

import { SpaceWasCreatedEvent } from '../../domain/event';

@EventsHandler(SpaceWasCreatedEvent)
export class SpaceWasCreatedMessageProducer
  implements IEventHandler<SpaceWasCreatedEvent>
{
  constructor(
    @Inject('DATASERVICE')
    private readonly spaceProducerClient: ClientKafka,
  ) {}

  async handle(event: SpaceWasCreatedEvent) {
    this.spaceProducerClient.emit(
      SPACE_WAS_CREATED_MESSAGE,
      JSON.stringify(event.payload),
    );
  }
}

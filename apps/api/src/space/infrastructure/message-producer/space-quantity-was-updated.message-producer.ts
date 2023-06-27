import { Inject } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { ClientKafka } from '@nestjs/microservices';
import { SPACE_QUANTITY_WAS_UPDATED_MESSAGE } from '@netspaces/contracts';

import { SpaceQuantityWasUpdatedEvent } from '../../domain/event';

@EventsHandler(SpaceQuantityWasUpdatedEvent)
export class SpaceQuantityWasUpdatedMessageProducer
  implements IEventHandler<SpaceQuantityWasUpdatedEvent>
{
  constructor(
    @Inject('DATASERVICE')
    private readonly spaceProducerClient: ClientKafka,
  ) {}

  async handle(event: SpaceQuantityWasUpdatedEvent) {
    this.spaceProducerClient.emit(
      SPACE_QUANTITY_WAS_UPDATED_MESSAGE,
      JSON.stringify(event.payload),
    );
  }
}

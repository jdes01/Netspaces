import { Inject } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { ClientKafka } from '@nestjs/microservices';
import { USER_WAS_DELETED_MESSAGE } from '@netspaces/contracts';

import { UserWasDeletedEvent } from '../../domain/event';

@EventsHandler(UserWasDeletedEvent)
export class UserWasDeletedMessageProducer
  implements IEventHandler<UserWasDeletedEvent>
{
  constructor(
    @Inject('DATASERVICE')
    private readonly userProducerClient: ClientKafka,
  ) {}

  async handle(event: UserWasDeletedEvent) {
    this.userProducerClient.emit(
      USER_WAS_DELETED_MESSAGE,
      JSON.stringify(event.payload),
    );
  }
}

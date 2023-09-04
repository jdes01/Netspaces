import { Inject } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { ClientKafka } from '@nestjs/microservices';
import { USER_WAS_CREATED_WITHOUT_COMPANY_MESSAGE } from '@netspaces/contracts';

import { UserWasCreatedWithoutCompanyEvent } from '../../domain/event';

import { WINSTON_MODULE_PROVIDER } from 'nest-winston';

import { Logger } from 'winston';

@EventsHandler(UserWasCreatedWithoutCompanyEvent)
export class UserWasCreatedWithoutCompanyMessageProducer
  implements IEventHandler<UserWasCreatedWithoutCompanyEvent>
{
  constructor(
    @Inject('DATASERVICE')
    private readonly userProducerClient: ClientKafka,
    @Inject(WINSTON_MODULE_PROVIDER)
    private readonly logger: Logger,
  ) { }

  async handle(event: UserWasCreatedWithoutCompanyEvent) {
    this.userProducerClient.emit(
      USER_WAS_CREATED_WITHOUT_COMPANY_MESSAGE,
      JSON.stringify(event.payload),
    );

    this.logger.info('User was created without company message was sent', { userId: event.id });
  }
}

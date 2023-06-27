import { Inject } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { ClientKafka } from '@nestjs/microservices';
import { COMPANY_WAS_DELETED_MESSAGE } from '@netspaces/contracts';

import { CompanyWasDeletedEvent } from '../../domain/event';

@EventsHandler(CompanyWasDeletedEvent)
export class CompanyWasDeletedMessageProducer
  implements IEventHandler<CompanyWasDeletedEvent>
{
  constructor(
    @Inject('DATASERVICE')
    private readonly companyProducerClient: ClientKafka,
  ) {}

  async handle(event: CompanyWasDeletedEvent) {
    this.companyProducerClient.emit(
      COMPANY_WAS_DELETED_MESSAGE,
      JSON.stringify(event.payload),
    );
  }
}

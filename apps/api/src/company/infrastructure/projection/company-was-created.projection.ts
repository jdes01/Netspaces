import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { CompanyWasCreatedEvent } from '../../domain/event';
import { COMPANY_PROJECTION, CompanyDocument } from './company.schema';

@EventsHandler(CompanyWasCreatedEvent)
export class CompanyWasCreatedProjection
  implements IEventHandler<CompanyWasCreatedEvent>
{
  constructor(
    @InjectModel(COMPANY_PROJECTION)
    private readonly companyProjection: Model<CompanyDocument>,
  ) {}

  async handle(event: CompanyWasCreatedEvent) {
    const company = new this.companyProjection({
      ...event.payload,
    });
    await company.save();
  }
}

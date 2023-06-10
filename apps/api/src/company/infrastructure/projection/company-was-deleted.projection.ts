import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { CompanyWasDeletedEvent } from '../../domain/event';
import { COMPANY_PROJECTION, CompanyDocument } from './company.schema';

@EventsHandler(CompanyWasDeletedEvent)
export class CompanyWasDeletedProjection implements IEventHandler<CompanyWasDeletedEvent> {
    constructor(
        @InjectModel(COMPANY_PROJECTION)
        private readonly companyProjection: Model<CompanyDocument>,
    ) { }

    async handle(event: CompanyWasDeletedEvent) {
        const companyView = await this.companyProjection
            .findById(event.id)
            .exec();

        companyView.remove()
    }
}

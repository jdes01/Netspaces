import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { CompanyNameWasUpdated } from '../../domain/event';
import { COMPANY_PROJECTION, CompanyDocument } from './company.schema';

@EventsHandler(CompanyNameWasUpdated)
export class CompanyNameWasUpdatedProjection implements IEventHandler<CompanyNameWasUpdated> {
    constructor(
        @InjectModel(COMPANY_PROJECTION)
        private readonly companyProjection: Model<CompanyDocument>,
    ) { }

    async handle(event: CompanyNameWasUpdated) {
        this.companyProjection
            .findByIdAndUpdate(event.id, {
                name: event.name,
            })
            .exec();
    }
}

import { Controller, Logger } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';
import { InjectModel } from '@nestjs/mongoose';
import { COMPANY_WAS_DELETED_MESSAGE, CompanyWasDeletedMessage } from '@netspaces/contracts';
import { Model } from 'mongoose';

import { COMPANY_PROJECTION, CompanyDocument } from './schema/company.schema';

@Controller()
export class CompanyWasDeletedProjection {
    constructor(
        @InjectModel(COMPANY_PROJECTION)
        private readonly companyProjection: Model<CompanyDocument>,
    ) { }

    @EventPattern(COMPANY_WAS_DELETED_MESSAGE)
    async handle(message: CompanyWasDeletedMessage) {
        const companyView = await this.companyProjection
            .findById(message._id)
            .exec();

        companyView.remove();

        Logger.log(`Company ${message._id} removed`);
    }
}

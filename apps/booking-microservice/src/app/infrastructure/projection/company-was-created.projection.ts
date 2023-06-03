import { Controller, Logger } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';
import { InjectModel } from '@nestjs/mongoose';
import { COMPANY_WAS_CREATED_MESSAGE, CompanyWasCreatedMessage } from '@netspaces/contracts';
import { Model } from 'mongoose';

import { COMPANY_PROJECTION, CompanyDocument } from './schema/company.schema';

@Controller()
export class CompanyWasCreatedProjection {
    constructor(
        @InjectModel(COMPANY_PROJECTION)
        private readonly companyProjection: Model<CompanyDocument>,
    ) { }

    @EventPattern(COMPANY_WAS_CREATED_MESSAGE)
    async handle(message: CompanyWasCreatedMessage) {
        const company = new this.companyProjection({
            ...message,
        });
        await company.save();

        Logger.log(`Company ${message._id} stored`);
    }
}

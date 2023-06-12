import { Controller, Inject } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';
import { InjectModel } from '@nestjs/mongoose';
import { COMPANY_WAS_DELETED_MESSAGE, CompanyWasDeletedMessage } from '@netspaces/contracts';
import { Model } from 'mongoose';

import { COMPANY_PROJECTION, CompanyDocument } from '.././schema/company.schema';

import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';

@Controller()
export class CompanyWasDeletedProjection {
    constructor(
        @InjectModel(COMPANY_PROJECTION)
        private readonly companyProjection: Model<CompanyDocument>,
        @Inject(WINSTON_MODULE_PROVIDER)
        private readonly logger: Logger,
    ) { }

    @EventPattern(COMPANY_WAS_DELETED_MESSAGE)
    async handle(message: CompanyWasDeletedMessage) {
        const companyView = await this.companyProjection
            .findById(message._id)
            .exec();

        companyView.remove();

        this.logger.info("Company removed", { companyId: message._id });
    }
}

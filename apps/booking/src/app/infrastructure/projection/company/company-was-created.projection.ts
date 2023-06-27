import { Controller, Inject } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';
import { InjectModel } from '@nestjs/mongoose';
import {
  COMPANY_WAS_CREATED_MESSAGE,
  CompanyWasCreatedMessage,
} from '@netspaces/contracts';
import { Model } from 'mongoose';

import { COMPANY_PROJECTION, CompanyDocument } from '../schema/company.schema';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';

@Controller()
export class CompanyWasCreatedProjection {
  constructor(
    @InjectModel(COMPANY_PROJECTION)
    private readonly companyProjection: Model<CompanyDocument>,
    @Inject(WINSTON_MODULE_PROVIDER)
    private readonly logger: Logger,
  ) {}

  @EventPattern(COMPANY_WAS_CREATED_MESSAGE)
  async handle(message: CompanyWasCreatedMessage) {
    const company = new this.companyProjection({
      ...message,
    });
    await company.save();

    this.logger.info('Company stored', { companyId: message._id });
  }
}

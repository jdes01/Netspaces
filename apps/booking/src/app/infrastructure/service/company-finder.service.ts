import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CompanyDTO } from '@netspaces/contracts';
import { Model } from 'mongoose';

import { CompanyFinder } from '../../application/service/company-finder.service';
import { BookingCompanyId } from '../../domain/model/value-objects';
import {
  COMPANY_PROJECTION,
  CompanyDocument,
} from '../projection/schema/company.schema';

@Injectable()
export class MongoDBCompanyFinder implements CompanyFinder {
  constructor(
    @InjectModel(COMPANY_PROJECTION)
    private readonly companyProjection: Model<CompanyDocument>,
  ) {}

  find(id: BookingCompanyId): Promise<CompanyDTO | null> {
    return this.companyProjection.findById(id.value).exec();
  }
}

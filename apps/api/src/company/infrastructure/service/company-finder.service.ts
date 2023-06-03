import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CompanyDTO } from '@netspaces/contracts';
import { Model } from 'mongoose';

import { CompanyFinder } from '../../application/service/company-finder.service';
import { CompanyId } from '../../domain/model/value-objects';
import { COMPANY_PROJECTION, CompanyDocument } from '../projection';

@Injectable()
export class MongoDBCompanyFinder implements CompanyFinder {
	constructor(
		@InjectModel(COMPANY_PROJECTION)
		private readonly companyProjection: Model<CompanyDocument>,
	) { }

	findAll(): Promise<CompanyDTO[]> {
		return this.companyProjection.find().exec();
	}

	find(id: CompanyId): Promise<CompanyDTO | null> {
		return this.companyProjection.findById(id.value).exec();
	}
}

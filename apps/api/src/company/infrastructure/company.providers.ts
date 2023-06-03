import { REDIS_SERVICE, RedisService } from '../../redis.module';
import { COMPANY_FINDER } from '../application/service/company-finder.service';
import { MongoDBCompanyFinder } from './service/company-finder.service';

export const CompanyProviders = [
	{
		provide: COMPANY_FINDER,
		useClass: MongoDBCompanyFinder,
	},
	{
		provide: REDIS_SERVICE,
		useClass: RedisService,
	},
];

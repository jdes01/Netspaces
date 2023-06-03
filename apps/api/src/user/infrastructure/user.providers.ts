import { COMPANY_FINDER } from '../../company/application/service/company-finder.service';
import { MongoDBCompanyFinder } from '../../company/infrastructure/service/company-finder.service';
import { REDIS_SERVICE, RedisService } from '../../redis.module';
import { USER_FINDER } from '../application/service/user-finder.service';
import { MongoDBUserFinder } from '../infrastructure/service/user-finder.service';

export const UserProviders = [
	{
		provide: USER_FINDER,
		useClass: MongoDBUserFinder,
	},
	{
		provide: COMPANY_FINDER,
		useClass: MongoDBCompanyFinder,
	},
	{
		provide: REDIS_SERVICE,
		useClass: RedisService,
	},
];

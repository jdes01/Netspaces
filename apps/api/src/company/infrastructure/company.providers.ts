import { REDIS_SERVICE, RedisService } from '../../redis.module';
import { USER_FINDER } from '../../user/application/service/user-finder.service';
import { MongoDBUserFinder } from '../../user/infrastructure/service/user-finder.service';
import { WORKSPACE_FINDER } from '../../workspace/application/service/workspace-finder.service';
import { MongoDBWorkspaceFinder } from '../../workspace/infrastructure/service/workspace-finder.service';
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
  {
    provide: USER_FINDER,
    useClass: MongoDBUserFinder,
  },
  {
    provide: WORKSPACE_FINDER,
    useClass: MongoDBWorkspaceFinder,
  },
];

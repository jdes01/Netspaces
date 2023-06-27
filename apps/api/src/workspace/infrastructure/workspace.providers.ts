import { COMPANY_FINDER } from '../../company/application/service/company-finder.service';
import { MongoDBCompanyFinder } from '../../company/infrastructure/service/company-finder.service';
import { REDIS_SERVICE, RedisService } from '../../redis.module';
import { SPACE_FINDER } from '../../space/application/service';
import { MongoDBSpaceFinder } from '../../space/infrastructure/service/space-finder.service';
import { USER_FINDER } from '../../user/application/service/user-finder.service';
import { MongoDBUserFinder } from '../../user/infrastructure/service/user-finder.service';
import { WORKSPACE_FINDER } from '../application/service/workspace-finder.service';
import { MongoDBWorkspaceFinder } from '../infrastructure/service/workspace-finder.service';

export const WorkspaceProviders = [
  {
    provide: WORKSPACE_FINDER,
    useClass: MongoDBWorkspaceFinder,
  },
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
  {
    provide: SPACE_FINDER,
    useClass: MongoDBSpaceFinder,
  },
];

import { REDIS_SERVICE, RedisService } from '../../redis.module';
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
		provide: REDIS_SERVICE,
		useClass: RedisService
	}
];

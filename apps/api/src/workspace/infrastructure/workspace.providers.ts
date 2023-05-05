import { REDIS_SERVICE, RedisService } from '../../redis.module';
import { WORKSPACE_FINDER } from '../application/service/workspace-finder.service';
import { MongoDBWorkspaceFinder } from '../infrastructure/service/workspace-finder.service';

export const WorkspaceProviders = [
	{
		provide: WORKSPACE_FINDER,
		useClass: MongoDBWorkspaceFinder,
	},
	{
		provide: REDIS_SERVICE,
		useClass: RedisService
	}
];

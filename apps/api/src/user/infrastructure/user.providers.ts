import { REDIS_SERVICE, RedisService } from '../../redis.module';
import { USER_FINDER } from '../application/service/user-finder.service';
import { MongoDBUserFinder } from '../infrastructure/service/user-finder.service';

export const UserProviders = [
    {
        provide: USER_FINDER,
        useClass: MongoDBUserFinder,
    },
    {
        provide: REDIS_SERVICE,
        useClass: RedisService
    }
];

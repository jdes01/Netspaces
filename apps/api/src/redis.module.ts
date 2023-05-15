import { Injectable, Module } from '@nestjs/common';
import Redis from 'ioredis';

export const REDIS_SERVICE = 'REDIS_SERVICE';

@Injectable()
export class RedisService {
	redis: Redis;
	constructor() {
		this.redis = new Redis({
			host: 'netspaces-cache',
			port: 6379,
		});
	}

	async set(key: string, value: string | number | Buffer) {
		return await this.redis.set(key, value);
	}
}

@Module({
	exports: [RedisService],
	providers: [RedisService],
})
export class RedisModule {}

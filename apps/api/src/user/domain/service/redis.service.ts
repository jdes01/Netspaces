import { Result } from 'neverthrow';

export interface RedisService {
  set(key: string, value: string | number | Buffer);
}

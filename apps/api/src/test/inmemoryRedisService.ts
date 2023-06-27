import { NotImplementedException } from '@nestjs/common';

export class InmemoryRedisService {
  async set(key: string, value: string | number | Buffer) {
    throw new NotImplementedException();
  }
}

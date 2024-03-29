import {
  EVENTSTORE_KEYSTORE_CONNECTION,
  EventStoreModule,
} from '@aulasoftwarelibre/nestjs-eventstore';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CqrsModule } from '@nestjs/cqrs';
import { MongooseModule } from '@nestjs/mongoose';
import { ConsoleModule } from 'nestjs-console';

import configuration from './config/configuration';
import { RedisModule } from './redis.module';
import { SpaceModule } from './space';
import { UserModule } from './user/infrastructure/user.module';
import { WorkspaceModule } from './workspace';
import { CompanyModule } from './company';

import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: [
        `.env.${process.env.NODE_ENV}.local`,
        `.env.${process.env.NODE_ENV}`,
        '.env.local',
        '.env',
      ],
      isGlobal: true,
      load: [configuration],
    }),
    CqrsModule,
    ConsoleModule,
    EventStoreModule.forRoot({
      connection: process.env.EVENTSTORE_URI || '',
    }),
    MongooseModule.forRoot(process.env.MONGO_URI || '', {}),
    MongooseModule.forRoot(process.env.KEYSTORE_URI || '', {
      connectionName: EVENTSTORE_KEYSTORE_CONNECTION,
    }),
    WorkspaceModule,
    SpaceModule,
    UserModule,
    CompanyModule,
    RedisModule,
    AuthModule
  ],
})
export class BootstrapModule { }

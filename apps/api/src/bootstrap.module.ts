import { Module } from '@nestjs/common';
import { EventStoreModule } from '@aulasoftwarelibre/nestjs-eventstore';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { CqrsModule } from '@nestjs/cqrs';
import { EVENTSTORE_KEYSTORE_CONNECTION } from '@aulasoftwarelibre/nestjs-eventstore';
import configuration from './config/configuration';
import { ConsoleModule } from 'nestjs-console';
import { WorkspaceModule } from './workspace';
import { SpaceModule } from './space';

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
      connection: process.env.EVENTSTORE_URI,
    }),
    MongooseModule.forRoot(process.env.MONGO_URI, {}),
    MongooseModule.forRoot(process.env.KEYSTORE_URI, {
      connectionName: EVENTSTORE_KEYSTORE_CONNECTION,
    }),
    WorkspaceModule,
    SpaceModule
  ],
})
export class BootstrapModule { }

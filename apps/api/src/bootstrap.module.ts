import { Module } from '@nestjs/common';
import { EventStoreModule } from '@aulasoftwarelibre/nestjs-eventstore';
import { ConfigService, ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose'
import { CqrsModule } from '@nestjs/cqrs';

import configuration from './config/configuration';


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
        EventStoreModule.forRootAsync({
            useFactory: (configService: ConfigService) => ({
                category: configService.get('eventstore.category'),
                connection: configService.get('eventstore.connection'),
            }),
            inject: [ConfigService],
        }),
        MongooseModule.forRootAsync({
            imports: [ConfigModule],
            useFactory: (configService: ConfigService) => ({
                uri: configService.get('database.uri'),
            }),
            inject: [ConfigService],
        }),
    ],
})
export class BootstrapModule { }
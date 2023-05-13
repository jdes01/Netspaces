import { Event, EventStoreModule } from '@aulasoftwarelibre/nestjs-eventstore';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { GraphQLModule } from '@nestjs/graphql';
import { MongooseModule } from '@nestjs/mongoose';
import { CreateUserDTO } from '@netspaces/contracts';

import { CommandHandlers } from '../application/command';
import { QueryHandlers } from '../application/query';
import { UserWasCreatedEvent } from '../domain/event';
import { User } from '../domain/model';
import { UserResolver } from './graphql/resolvers/user.resolver';
import { ProjectionHandlers } from './projection';
import { USER_PROJECTION, UserSchema } from './projection/user.schema';
import { UserService } from './service/user.service';
import { UserProviders } from './user.providers';

import { RedisModule } from '../../redis.module'
import { ClientsModule, Transport } from '@nestjs/microservices';
import { MessageProducers } from './message-producer';
import { logLevel } from '@nestjs/microservices/external/kafka.interface';

@Module({
    controllers: [],
    imports: [
        CqrsModule,
        ClientsModule.register([
            {
                name: 'DATASERVICE',
                transport: Transport.KAFKA,
                options: {
                    client: {
                        clientId: 'user-producer',
                        brokers: ['kafka:9092'],
                        logLevel: logLevel.ERROR
                    },
                    consumer: {
                        groupId: 'booking-consumer'
                    }
                }
            },
        ]),
        EventStoreModule.forFeature([User], {
            UserWasCreatedEvent: (event: Event<CreateUserDTO>) =>
                new UserWasCreatedEvent(
                    event.payload._id,
                    event.payload.name,
                ),
        }),
        MongooseModule.forFeature([
            {
                name: USER_PROJECTION,
                schema: UserSchema,
            },
        ]),
        GraphQLModule.forRoot<ApolloDriverConfig>({
            autoSchemaFile: true,
            driver: ApolloDriver,
        }),
        RedisModule
    ],
    providers: [
        ...CommandHandlers,
        ...QueryHandlers,
        ...ProjectionHandlers,
        ...MessageProducers,
        ...UserProviders,
        UserResolver,
        UserService,
        RedisModule
    ],
})
export class UserModule { }

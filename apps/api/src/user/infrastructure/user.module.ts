import { Event, EventStoreModule } from '@aulasoftwarelibre/nestjs-eventstore';
import {
  ApolloDriver,
  ApolloDriverConfig,
  ApolloFederationDriver,
  ApolloFederationDriverConfig,
} from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { GraphQLModule } from '@nestjs/graphql';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { logLevel } from '@nestjs/microservices/external/kafka.interface';
import { MongooseModule } from '@nestjs/mongoose';
import {
  CreateUserWithCompanyDTO,
  CreateUserWithoutCompanyDTO,
  DeleteUserDTO,
  UpdateUserNameDTO,
} from '@netspaces/contracts';

import { RedisModule } from '../../redis.module';
import { CommandHandlers } from '../application/command';
import { QueryHandlers } from '../application/query';
import {
  UserWasCreatedWithoutCompanyEvent,
  UserWasCreatedWithCompanyEvent,
  UserNameWasUpdatedEvent,
  UserWasDeletedEvent,
} from '../domain/event';
import { User } from '../domain/model';
import { UserResolver } from './graphql/resolvers/user.resolver';
import { MessageProducers } from './message-producer';
import { ProjectionHandlers } from './projection';
import { USER_PROJECTION, UserSchema } from './projection/user.schema';
import { UserService } from './service/user.service';
import { UserProviders } from './user.providers';
import {
  COMPANY_PROJECTION,
  CompanySchema,
} from '../../company/infrastructure/projection';
import { WinstonModule } from 'nest-winston';
import { LoggerConfig } from '../../logger';

const logger: LoggerConfig = new LoggerConfig();

@Module({
  controllers: [],
  imports: [
    CqrsModule,
    ClientsModule.register([
      {
        name: 'DATASERVICE',
        options: {
          client: {
            brokers: ['kafka:9092'],
            clientId: 'user-producer',
            logLevel: logLevel.ERROR,
          },
          consumer: {
            groupId: 'booking-consumer',
          },
          producerOnlyMode: true,
        },
        transport: Transport.KAFKA,
      },
    ]),
    EventStoreModule.forFeature([User], {
      UserWasCreatedWithoutCompanyEvent: (
        event: Event<CreateUserWithoutCompanyDTO>,
      ) =>
        new UserWasCreatedWithoutCompanyEvent(
          event.payload._id,
          event.payload.name,
        ),
      UserWasCreatedWithCompanyEvent: (
        event: Event<CreateUserWithCompanyDTO>,
      ) =>
        new UserWasCreatedWithCompanyEvent(
          event.payload._id,
          event.payload.name,
          event.payload.companyId,
        ),
      UserNameWasUpdatedEvent: (event: Event<UpdateUserNameDTO>) =>
        new UserNameWasUpdatedEvent(event.payload._id, event.payload.name),
      UserWasDeletedEvent: (event: Event<DeleteUserDTO>) =>
        new UserWasDeletedEvent(event.payload._id),
    }),
    MongooseModule.forFeature([
      {
        name: USER_PROJECTION,
        schema: UserSchema,
      },
      {
        name: COMPANY_PROJECTION,
        schema: CompanySchema,
      },
    ]),
    GraphQLModule.forRoot<ApolloFederationDriverConfig>({
      autoSchemaFile: {
        federation: 2,
      },
      driver: ApolloFederationDriver,
    }),
    RedisModule,
    WinstonModule.forRoot(logger.console()),
  ],
  providers: [
    ...CommandHandlers,
    ...QueryHandlers,
    ...ProjectionHandlers,
    ...MessageProducers,
    ...UserProviders,
    UserResolver,
    UserService,
    RedisModule,
  ],
})
export class UserModule {}

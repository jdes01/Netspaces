import { Event, EventStoreModule } from '@aulasoftwarelibre/nestjs-eventstore';
import {
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
  CreateSpaceDTO,
  DeleteSpaceDTO,
  UpdateSpaceNameDTO,
  UpdateSpaceQuantityDTO,
  UpdateSpaceSeatsDTO,
} from '@netspaces/contracts';

import {
  WORKSPACE_PROJECTION,
  WorkspaceSchema,
} from '../../workspace/infrastructure/projection';
import { CommandHandlers } from '../application/command';
import { QueryHandlers } from '../application/query';
import {
  SpaceNameWasUpdatedEvent,
  SpaceQuantityWasUpdatedEvent,
  SpaceSeatsWasUpdatedEvent,
  SpaceWasCreatedEvent,
  SpaceWasDeletedEvent,
} from '../domain/event';
import { Space } from '../domain/model';
import { SpaceAmenity } from '../domain/model/value-objects';
import { SpaceController } from './controller';
import { SpaceResolver } from './graphql/resolvers/space.resolver';
import { MessageProducers } from './message-producer';
import { ProjectionHandlers } from './projection';
import { SPACE_PROJECTION, SpaceSchema } from './projection/space.schema';
import { SpaceService } from './service/space.service';
import { SpaceProviders } from './space.providers';

import { WinstonModule } from 'nest-winston';
import { LoggerConfig } from '../../logger';

const logger: LoggerConfig = new LoggerConfig();
@Module({
  controllers: [SpaceController],
  imports: [
    CqrsModule,
    ClientsModule.register([
      {
        name: 'DATASERVICE',
        options: {
          client: {
            brokers: ['kafka:9092'],
            clientId: 'space-producer',
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
    EventStoreModule.forFeature([Space], {
      SpaceWasCreatedEvent: (event: Event<CreateSpaceDTO>) =>
        new SpaceWasCreatedEvent(
          event.payload._id,
          event.payload.workspaceId,
          event.payload.name,
          event.payload.quantity,
          event.payload.seats,
          SpaceAmenity.toStringList(event.payload.amenitys),
          event.payload.image
        ),
      SpaceNameWasUpdatedEvent: (event: Event<UpdateSpaceNameDTO>) =>
        new SpaceNameWasUpdatedEvent(event.payload._id, event.payload.name),

      SpaceQuantityWasUpdatedEvent: (event: Event<UpdateSpaceQuantityDTO>) =>
        new SpaceQuantityWasUpdatedEvent(
          event.payload._id,
          event.payload.quantity,
        ),

      SpaceSeatsWasUpdatedEvent: (event: Event<UpdateSpaceSeatsDTO>) =>
        new SpaceSeatsWasUpdatedEvent(event.payload._id, event.payload.seats),
      SpaceWasDeletedEvent: (event: Event<DeleteSpaceDTO>) =>
        new SpaceWasDeletedEvent(event.payload._id),
    }),
    MongooseModule.forFeature([
      {
        name: SPACE_PROJECTION,
        schema: SpaceSchema,
      },
      {
        name: WORKSPACE_PROJECTION,
        schema: WorkspaceSchema,
      },
    ]),
    GraphQLModule.forRoot<ApolloFederationDriverConfig>({
      autoSchemaFile: {
        federation: 2,
      },
      driver: ApolloFederationDriver,
    }),
    WinstonModule.forRoot(logger.console()),
  ],
  providers: [
    ...CommandHandlers,
    ...QueryHandlers,
    ...ProjectionHandlers,
    ...MessageProducers,
    ...SpaceProviders,
    SpaceResolver,
    SpaceService,
  ],
})
export class SpaceModule { }

// @ts-nocheck

import { Event, EventStoreModule } from '@aulasoftwarelibre/nestjs-eventstore';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { GraphQLModule } from '@nestjs/graphql';
import { MongooseModule } from '@nestjs/mongoose';
import { CreateWorkspaceDTO } from '@netspaces/contracts';

import { CommandHandlers } from '../application/command';
import { QueryHandlers } from '../application/query';
import { WorkspaceWasCreatedEvent } from '../domain/event';
import { Workspace } from '../domain/model';
import { WorkspaceController } from './controller';
import { WorkspaceResolver } from './graphql/resolvers/workspace.resolver';
import { ProjectionHandlers } from './projection';
import { WORKSPACE_PROJECTION, WorkspaceSchema } from './projection/workspace.schema';
import { WorkspaceService } from './service/workspace.service';
import { WorkspaceProviders } from './workspace.providers';
import { SpaceService } from '../../space/infrastructure/service/space.service';
import { MessageProducers } from './message-producer';


import { RedisModule } from '../../redis.module'
import { USER_PROJECTION, UserSchema } from '../../user/infrastructure/projection';

import { ClientsModule, Transport } from '@nestjs/microservices'
import { logLevel } from '@nestjs/microservices/external/kafka.interface';


@Module({
	controllers: [WorkspaceController],
	imports: [
		ClientsModule.register([
			{
				name: 'DATASERVICE',
				transport: Transport.KAFKA,
				options: {
					client: {
						clientId: 'workspace-producer',
						brokers: ['kafka:9092'],
						logLevel: logLevel.ERROR
					},
					consumer: {
						groupId: 'booking-consumer'
					},
					producerOnlyMode: true
				}
			},
		]),
		CqrsModule,
		EventStoreModule.forFeature([Workspace], {
			WorkspaceWasCreatedEvent: (event: Event<CreateWorkspaceDTO>) =>
				new WorkspaceWasCreatedEvent(
					event.payload._id,
					event.payload.owner,
					event.payload.name,
					event.payload.description,
					event.payload.street,
					event.payload.city,
					event.payload.country,
					event.payload.services.map((service) => service.toString()),
				),
		}),
		MongooseModule.forFeature([
			{
				name: WORKSPACE_PROJECTION,
				schema: WorkspaceSchema,
			},
			{
				name: USER_PROJECTION,
				schema: UserSchema,
			},
		]),
		GraphQLModule.forRoot<ApolloDriverConfig>({
			autoSchemaFile: true,
			driver: ApolloDriver,
		}),
		RedisModule,
	],
	providers: [
		...CommandHandlers,
		...QueryHandlers,
		...ProjectionHandlers,
		...MessageProducers,
		...WorkspaceProviders,
		WorkspaceResolver,
		SpaceService,
		WorkspaceService,
		RedisModule,
	],
})
export class WorkspaceModule { }

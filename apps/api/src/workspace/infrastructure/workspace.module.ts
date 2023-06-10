import { Event, EventStoreModule } from '@aulasoftwarelibre/nestjs-eventstore';
import { ApolloFederationDriver, ApolloFederationDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { GraphQLModule } from '@nestjs/graphql';
import { MongooseModule } from '@nestjs/mongoose';
import { CreateWorkspaceDTO, DeleteWorkspaceDTO, UpdateWorkspaceDescriptionDTO, UpdateWorkspaceLocationDTO, UpdateWorkspaceNameDTO } from '@netspaces/contracts';

import { RedisModule } from '../../redis.module';
import { SpaceService } from '../../space/infrastructure/service/space.service';
import { USER_PROJECTION, UserSchema } from '../../user/infrastructure/projection';
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
import { COMPANY_PROJECTION, CompanySchema } from '../../company/infrastructure/projection';

import { WorkspaceNameWasUpdatedEvent, WorkspaceDescriptionWasUpdatedEvent, WorkspaceLocationWasUpdatedEvent, WorkspaceWasDeletedEvent } from '../domain/event';

@Module({
	controllers: [WorkspaceController],
	imports: [
		CqrsModule,
		EventStoreModule.forFeature([Workspace], {
			WorkspaceWasCreatedEvent: (event: Event<CreateWorkspaceDTO>) =>
				new WorkspaceWasCreatedEvent(
					event.payload._id,
					event.payload.companyId,
					event.payload.name,
					event.payload.description,
					event.payload.street,
					event.payload.city,
					event.payload.country,
					event.payload.services.map((service) => service.toString()),
				),
			WorkspaceNameWasUpdatedEvent: (event: Event<UpdateWorkspaceNameDTO>) =>
				new WorkspaceNameWasUpdatedEvent(
					event.payload._id,
					event.payload.name,
				),
			WorkspaceDescriptionWasUpdatedEvent: (event: Event<UpdateWorkspaceDescriptionDTO>) =>
				new WorkspaceDescriptionWasUpdatedEvent(
					event.payload._id,
					event.payload.description,
				),
			WorkspaceLocationWasUpdatedEvent: (event: Event<UpdateWorkspaceLocationDTO>) =>
				new WorkspaceLocationWasUpdatedEvent(
					event.payload._id,
					event.payload.street,
					event.payload.city,
					event.payload.country,
				),
			WorkspaceWasDeletedEvent: (event: Event<DeleteWorkspaceDTO>) =>
				new WorkspaceWasDeletedEvent(
					event.payload._id,
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
	],
	providers: [
		...CommandHandlers,
		...QueryHandlers,
		...ProjectionHandlers,
		...WorkspaceProviders,
		WorkspaceResolver,
		SpaceService,
		WorkspaceService,
		RedisModule,
	],
})
export class WorkspaceModule { }

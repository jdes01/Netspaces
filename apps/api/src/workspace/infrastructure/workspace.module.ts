import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { MongooseModule } from '@nestjs/mongoose';

import { CommandHandlers } from '../application/command';
import { QueryHandlers } from '../application/query';
import { ProjectionHandlers } from './projection';
import { WorkspaceController } from './controller';
import { WorkspaceProviders } from './workspace.providers';
import { Event, EventStoreModule } from '@aulasoftwarelibre/nestjs-eventstore';
import { Workspace } from '../domain/model';
import { WorkspaceWasCreatedEvent } from '../domain/event';
import { CreateWorkspaceDTO } from '@netspaces/contracts';
import { WorkspaceSchema, WORKSPACE_PROJECTION } from './projection/workspace.schema';
import { WorkspaceService } from './service/workspace.service';

@Module({
	controllers: [WorkspaceController],
	imports: [
		CqrsModule,
		EventStoreModule.forFeature([Workspace], {
			WorkspaceWasCreatedEvent: (event: Event<CreateWorkspaceDTO>) =>
				new WorkspaceWasCreatedEvent(
					event.payload._id,
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
		]),
	],
	providers: [...CommandHandlers, ...QueryHandlers, ...ProjectionHandlers, ...WorkspaceProviders, WorkspaceService],
})
export class WorkspaceModule {}

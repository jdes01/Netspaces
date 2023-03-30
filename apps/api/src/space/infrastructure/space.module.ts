import { Event, EventStoreModule } from '@aulasoftwarelibre/nestjs-eventstore';
import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { MongooseModule } from '@nestjs/mongoose';
import { CreateSpaceDTO } from '@netspaces/contracts';

import { WORKSPACE_PROJECTION, WorkspaceSchema } from '../../workspace/infrastructure/projection';
import { CommandHandlers } from '../application/command';
import { QueryHandlers } from '../application/query';
import { SpaceWasCreatedEvent } from '../domain/event';
import { Space } from '../domain/model';
import { SpaceController } from './controller';
import { ProjectionHandlers } from './projection';
import { SPACE_PROJECTION, SpaceSchema } from './projection/space.schema';
import { SpaceService } from './service/space.service';
import { SpaceProviders } from './space.providers';

@Module({
	controllers: [SpaceController],
	imports: [
		CqrsModule,
		EventStoreModule.forFeature([Space], {
			SpaceWasCreatedEvent: (event: Event<CreateSpaceDTO>) =>
				new SpaceWasCreatedEvent(
					event.payload._id,
					event.payload.workspaceId,
					event.payload.name,
					event.payload.quantity,
					event.payload.seats,
					event.payload.amenities,
				),
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
	],
	providers: [...CommandHandlers, ...QueryHandlers, ...ProjectionHandlers, ...SpaceProviders, SpaceService],
})
export class SpaceModule {}

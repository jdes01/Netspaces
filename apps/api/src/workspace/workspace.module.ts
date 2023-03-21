import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { MongooseModule } from '@nestjs/mongoose';

import { CommandHandlers } from './application/command'
import { QueryHandlers } from './application/query'
import { ProjectionHandlers } from './infrastructure/projection'
import { WorkspaceController } from './infrastructure/controller';
import { WorkspaceProviders } from './workspace.providers';
import { Event, EventStoreModule } from '@aulasoftwarelibre/nestjs-eventstore';
import { Workspace } from './domain/model';
import { WorkspaceWasCreatedEvent } from './domain/event';
import { CreateWorkspaceDTO } from '@netspaces/contracts';
import { WorkspaceSchema, WORKSPACE_PROJECTION } from './infrastructure/projection/workspace.schema';
import { WorkspaceService } from './infrastructure/service/workspace.service';

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
export class WorkspaceModule { }

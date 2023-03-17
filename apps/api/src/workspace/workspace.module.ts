import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { EventSourcingModule } from 'event-sourcing-nestjs';
import { DatabaseModule } from '../mongodb/mongodb.module';

import { CommandHandlers } from './application/command'
import { WorkspaceProviders } from './workspace.providers';

const QueryHandlers = [];
const Sagas = [];

@Module({
    imports: [
        CqrsModule, DatabaseModule, EventSourcingModule
    ],
    providers: [...CommandHandlers, ...QueryHandlers, ...Sagas, ...WorkspaceProviders],
})
export class WorkspaceModule { }

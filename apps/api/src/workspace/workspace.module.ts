import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

import { CommandHandlers } from './application/command'
import { WorkspaceProviders } from './workspace.providers';

const QueryHandlers = [];
const Sagas = [];

@Module({
    imports: [
        CqrsModule,
    ],
    providers: [...CommandHandlers, ...QueryHandlers, ...Sagas, ...WorkspaceProviders],
})
export class WorkspaceModule { }

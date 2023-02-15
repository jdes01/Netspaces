import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

const CommandHandlers = [];
const QueryHandlers = [];
const Sagas = [];

@Module({
    imports: [CqrsModule],
    providers: [...CommandHandlers, ...QueryHandlers, ...Sagas],
})
export class WorkspaceModule { }

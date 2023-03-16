import { WORKSPACE_REPOSITORY } from './domain/repository';
import { WorkspaceEventStoreRepository } from './infrastructure/repository';
import { Connection } from 'mongoose';
import { WorkspaceSchema, WORKSPACE_MONGOOSE_MODEL } from './infrastructure/read-model/schema/workspace.schema';

export const WorkspaceProviders = [
    {
        provide: WORKSPACE_REPOSITORY,
        useClass: WorkspaceEventStoreRepository
    },
    {
        provide: WORKSPACE_MONGOOSE_MODEL,
        useFactory: (connection: Connection) => connection.model('Workspace', WorkspaceSchema),
        inject: ['DATABASE_CONNECTION']
    },
];

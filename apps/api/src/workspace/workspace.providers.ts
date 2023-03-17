import { WORKSPACE_REPOSITORY } from './domain/repository';
import { WorkspaceEventStoreRepository } from './infrastructure/repository';

import { WORKSPACE_PROJECTION } from './domain/projection/';
import { WorkspaceSchema } from './infrastructure/projection/workspace.schema';
import { Connection } from 'mongoose';

export const WorkspaceProviders = [
    {
        provide: WORKSPACE_REPOSITORY,
        useClass: WorkspaceEventStoreRepository
    },
    {
        provide: WORKSPACE_PROJECTION,
        useFactory: (connection: Connection) => connection.model('Workspace', WorkspaceSchema),
        inject: ['DATABASE_CONNECTION']
    },
];

import { WORKSPACE_REPOSITORY } from './domain/repository';
import { WorkspaceEventStoreRepository } from './infrastructure/repository';

import { WORKSPACE_PROJECTION } from './domain/projection/';
import { WorkspaceMongoDBProjection } from './infrastructure/projection/workspace.projection';

export const WorkspaceProviders = [
    {
        provide: WORKSPACE_REPOSITORY,
        useClass: WorkspaceEventStoreRepository
    },
    {
        provide: WORKSPACE_PROJECTION,
        useClass: WorkspaceMongoDBProjection
    },
];

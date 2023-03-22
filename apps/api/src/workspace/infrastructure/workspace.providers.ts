import { WORKSPACE_FINDER } from '../domain/service/workspace-finder.service';
import { MongoDBWorkspaceFinder } from '../infrastructure/service/workspace-finder.service';

export const WorkspaceProviders = [
    {
        provide: WORKSPACE_FINDER,
        useClass: MongoDBWorkspaceFinder,
    },
];

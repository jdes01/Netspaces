import { WORKSPACE_FINDER } from '../application/service/workspace-finder.service';
import { WorkspaceFinder } from '../infrastructure/service/workspace-finder.service';

export const WorkspaceProviders = [
    {
        provide: WORKSPACE_FINDER,
        useClass: WorkspaceFinder,
    },
];

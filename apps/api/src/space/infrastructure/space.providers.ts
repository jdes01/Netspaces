import { WORKSPACE_FINDER } from '../../workspace/application/service/workspace-finder.service';
import { MongoDBWorkspaceFinder } from '../../workspace/infrastructure/service/workspace-finder.service';
import { SPACE_FINDER } from '../application/service/space-finder.service';
import { MongoDBSpaceFinder } from '../infrastructure/service/space-finder.service';

export const SpaceProviders = [
  {
    provide: SPACE_FINDER,
    useClass: MongoDBSpaceFinder,
  },
  {
    provide: WORKSPACE_FINDER,
    useClass: MongoDBWorkspaceFinder,
  },
];

import { SPACE_FINDER } from '../application/service/space-finder.service';
import { MongoDBSpaceFinder } from '../infrastructure/service/space-finder.service';

export const SpaceProviders = [
    {
        provide: SPACE_FINDER,
        useClass: MongoDBSpaceFinder,
    },
];

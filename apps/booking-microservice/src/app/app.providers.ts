import { BOOKING_FINDER } from "./application/service/booking-finder.service";
import { SPACE_FINDER } from "./application/service/space-finder.service";
import { USER_FINDER } from "./application/service/user-finder.service";
import { WORKSPACE_FINDER } from "./application/service/workspace-finder.service";
import { MongoDBBookingFinder } from "./infrastructure/service/booking-finder.service";
import { MongoDBSpaceFinder } from "./infrastructure/service/space-finder.service";
import { MongoDBUserFinder } from "./infrastructure/service/user-finder.service";
import { MongoDBWorkspaceFinder } from "./infrastructure/service/workspace-finder.service";

export const BookingProviders = [
    {
        provide: BOOKING_FINDER,
        useClass: MongoDBBookingFinder,
    },
    {
        provide: USER_FINDER,
        useClass: MongoDBUserFinder,
    },
    {
        provide: WORKSPACE_FINDER,
        useClass: MongoDBWorkspaceFinder,
    },
    {
        provide: SPACE_FINDER,
        useClass: MongoDBSpaceFinder,
    },
];

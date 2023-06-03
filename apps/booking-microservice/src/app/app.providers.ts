import { BOOKING_FINDER } from './application/service/booking-finder.service';
import { BOOKING_VALIDATOR } from './application/service/booking-validator.service';
import { SPACE_FINDER } from './application/service/space-finder.service';
import { USER_FINDER } from './application/service/user-finder.service';
import { COMPANY_FINDER } from './application/service/company-finder.service';

import { MongoDBBookingFinder } from './infrastructure/service/booking-finder.service';
import { MongoDBBookingValidator } from './infrastructure/service/booking-validator.service';
import { MongoDBSpaceFinder } from './infrastructure/service/space-finder.service';
import { MongoDBUserFinder } from './infrastructure/service/user-finder.service';
import { MongoDBCompanyFinder } from './infrastructure/service/company-finder.service';


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
		provide: COMPANY_FINDER,
		useClass: MongoDBCompanyFinder,
	},
	{
		provide: SPACE_FINDER,
		useClass: MongoDBSpaceFinder,
	},
	{
		provide: BOOKING_VALIDATOR,
		useClass: MongoDBBookingValidator,
	},
];

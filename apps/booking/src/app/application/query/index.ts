import { GetBookingsBySpaceQuery } from './get-bookings-by-space.query';
import { GetSpaceUnavailableDatesQuery } from './get-space-unavailable-dates.query';
import { GetBookingsBySpaceHandler } from './handler/get-bookings-by-space.handler';
import { GetSpaceUnavailableDatesHandler } from './handler/get-space-unavailable-dates.handler';

export const QueryHandlers = [GetBookingsBySpaceHandler, GetSpaceUnavailableDatesHandler];

export const Queries = [GetBookingsBySpaceQuery, GetSpaceUnavailableDatesQuery];

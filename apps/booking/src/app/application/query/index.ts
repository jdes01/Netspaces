import { GetBookingsBySpaceQuery } from './get-bookings-by-space.query';
import { GetSpaceAvailabilityByMonthQuery } from './get-space-availability-by-month.query';
import { GetSpaceUnavailableDatesQuery } from './get-space-unavailable-dates.query';
import { GetBookingsBySpaceHandler } from './handler/get-bookings-by-space.handler';
import { GetSpaceAvailabilityByMonthHandler } from './handler/get-space-availability-by-month.handler';
import { GetSpaceUnavailableDatesHandler } from './handler/get-space-unavailable-dates.handler';

export const QueryHandlers = [
  GetBookingsBySpaceHandler,
  GetSpaceUnavailableDatesHandler,
  GetSpaceAvailabilityByMonthHandler
];

export const Queries = [GetBookingsBySpaceQuery, GetSpaceUnavailableDatesQuery, GetSpaceAvailabilityByMonthQuery];

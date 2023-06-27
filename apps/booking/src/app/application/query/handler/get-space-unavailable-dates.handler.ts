import { Inject } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

import { BookingSpaceId } from '../../../domain/model/value-objects';
import {
  BOOKING_FINDER,
  BookingFinder,
} from '../../service/booking-finder.service';
import { SPACE_FINDER, SpaceFinder } from '../../service/space-finder.service';
import { GetSpaceUnavailableDatesQuery } from '../get-space-unavailable-dates.query';
import { Err, Ok, Result } from 'neverthrow';
import { BookingSpaceNotFoundError } from '../../../domain/exception';

@QueryHandler(GetSpaceUnavailableDatesQuery)
export class GetSpaceUnavailableDatesHandler implements IQueryHandler {
  constructor(
    @Inject(BOOKING_FINDER)
    private readonly bookingFinder: BookingFinder,
    @Inject(SPACE_FINDER)
    private readonly spaceFinder: SpaceFinder,
  ) {}

  async execute(
    query: GetSpaceUnavailableDatesQuery,
  ): Promise<Result<Array<string>, BookingSpaceNotFoundError>> {
    const spaceDTO = await this.spaceFinder.find(
      BookingSpaceId.fromString(query.spaceId),
    );

    if (spaceDTO === null)
      return new Err(
        BookingSpaceNotFoundError.withSpaceId(
          BookingSpaceId.fromString(query.spaceId),
        ),
      );

    return new Ok(
      await this.bookingFinder.findSpaceUnavailableDates(
        BookingSpaceId.fromString(query.spaceId),
        spaceDTO.quantity,
      ),
    );
  }
}

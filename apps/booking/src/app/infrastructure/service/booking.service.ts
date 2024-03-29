import { Injectable } from '@nestjs/common';
import { CommandBus, ICommand, IQuery, QueryBus } from '@nestjs/cqrs';
import { BookingDTO } from '@netspaces/contracts';
import { Result } from 'neverthrow';

import { CreateBookingCommand } from '../../application/command/create-booking.command';
import { GetBookingsBySpaceQuery } from '../../application/query/get-bookings-by-space.query';
import {
  BookingError,
  BookingSpaceNotFoundError,
} from '../../domain/exception';
import { GetSpaceUnavailableDatesQuery } from '../../application/query/get-space-unavailable-dates.query';
import { GetSpaceAvailabilityByMonthQuery } from '../../application/query/get-space-availability-by-month.query';
import { GetBookingsByUserQuery } from '../../application/query/get-bookings-by-user.query';

@Injectable()
export class BookingService {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) { }

  async createBooking(
    userMail: string,
    spaceId: string,
    date: string,
  ): Promise<Result<null, BookingError>> {
    return this.commandBus.execute<ICommand, Result<null, BookingError>>(
      new CreateBookingCommand(userMail, spaceId, date),
    );
  }

  async getBookingsBySpace(spaceId: string): Promise<Array<BookingDTO>> {
    return this.queryBus.execute<IQuery, Array<BookingDTO>>(
      new GetBookingsBySpaceQuery(spaceId),
    );
  }

  async getSpaceUnavailableDates(
    spaceId: string,
  ): Promise<Result<Array<string>, BookingSpaceNotFoundError>> {
    return this.queryBus.execute<
      IQuery,
      Result<Array<string>, BookingSpaceNotFoundError>
    >(new GetSpaceUnavailableDatesQuery(spaceId));
  }

  async getSpaceAvailabilityByMonthInput(spaceId: string, month: number, year: number): Promise<Result<Array<[number, number]>, BookingSpaceNotFoundError>> {
    return this.queryBus.execute<
      IQuery,
      Result<Array<[number, number]>, BookingSpaceNotFoundError>
    >(new GetSpaceAvailabilityByMonthQuery(spaceId, month, year));
  }

  async getBookingsByUser(userId: string): Promise<Array<BookingDTO>> {
    return this.queryBus.execute<IQuery, Array<BookingDTO>>(
      new GetBookingsByUserQuery(userId),
    );
  }
}

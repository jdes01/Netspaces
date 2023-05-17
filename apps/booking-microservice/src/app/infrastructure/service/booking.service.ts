import { Injectable } from '@nestjs/common';
import { CommandBus, ICommand, IQuery, QueryBus } from '@nestjs/cqrs';
import { BookingDTO } from '@netspaces/contracts';
import { Result } from 'neverthrow';

import { CreateBookingCommand } from '../../application/command/create-booking.command';
import { GetBookingsBySpaceQuery } from '../../application/query/get-bookings-by-space.query';
import { BookingError } from '../../domain/exception';

@Injectable()
export class BookingService {
	constructor(private readonly commandBus: CommandBus, private readonly queryBus: QueryBus) {}

	async createBooking(userId: string, spaceId: string, date: string): Promise<Result<null, BookingError>> {
		return this.commandBus.execute<ICommand, Result<null, BookingError>>(new CreateBookingCommand(userId, spaceId, date));
	}

	async getBookingsBySpace(spaceId: string): Promise<Array<BookingDTO>> {
		return this.queryBus.execute<IQuery, Array<BookingDTO>>(new GetBookingsBySpaceQuery(spaceId));
	}
}

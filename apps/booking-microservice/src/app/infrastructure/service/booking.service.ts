import { Injectable } from '@nestjs/common';
import { CommandBus, ICommand, QueryBus } from '@nestjs/cqrs';
import { SerializedDate } from '@netspaces/domain';
import { Result } from 'neverthrow';

import { CreateBookingCommand } from '../../application/command/create-booking.command';
import { BookingError } from '../../domain/exception';

@Injectable()
export class BookingService {
	constructor(private readonly commandBus: CommandBus, private readonly queryBus: QueryBus) {}

	async createBooking(userId: string, spaceId: string, date: SerializedDate): Promise<Result<null, BookingError>> {
		return this.commandBus.execute<ICommand, Result<null, BookingError>>(new CreateBookingCommand(userId, spaceId, date));
	}
}

import { Injectable } from '@nestjs/common';
import { CommandBus, ICommand, QueryBus } from '@nestjs/cqrs';
import { Result } from 'neverthrow';

import { BookingError } from '../../domain/exception';
import { SerializedDate } from '@netspaces/domain';
import { CreateBookingCommand } from '../../application/command/create-booking.command';

@Injectable()
export class BookingService {
    constructor(private readonly commandBus: CommandBus, private readonly queryBus: QueryBus) { }

    async createBooking(
        id: string,
        userId: string,
        workspaceId: string,
        spaceId: string,
        date: SerializedDate
    ): Promise<Result<null, BookingError>> {

        return this.commandBus.execute<ICommand, Result<null, BookingError>>(
            new CreateBookingCommand(id, userId, workspaceId, spaceId, date),
        );
    }

}

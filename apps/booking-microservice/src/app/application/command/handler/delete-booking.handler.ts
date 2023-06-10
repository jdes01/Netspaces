import { AggregateRepository, InjectAggregateRepository } from '@aulasoftwarelibre/nestjs-eventstore';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Err, Ok, Result } from 'neverthrow';

import { DeleteBookingCommand } from '../delete-booking.command';
import { BookingError, BookingNotFoundError } from '../../../domain/exception';
import { BookingId } from '../../../domain/model/value-objects';
import { Booking } from '../../../domain/model/booking';
import { Logger } from '@nestjs/common';

@CommandHandler(DeleteBookingCommand)
export class DeleteBookingHandler implements ICommandHandler<DeleteBookingCommand> {
    constructor(
        @InjectAggregateRepository(Booking)
        private readonly BookingRepository: AggregateRepository<Booking, BookingId>,
    ) { }

    async execute(command: DeleteBookingCommand): Promise<Result<null, BookingError>> {
        Logger.log("DELETING BOOKING")
        const id = BookingId.fromString(command.id);
        const booking = await this.BookingRepository.find(id)

        if (booking === null) {
            return new Err(BookingNotFoundError.withId(id));
        }

        booking.delete()
        this.BookingRepository.save(booking);

        return new Ok(null);
    }
}

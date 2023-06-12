import { AggregateRepository, InjectAggregateRepository } from '@aulasoftwarelibre/nestjs-eventstore';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Err, Ok, Result } from 'neverthrow';

import { DeleteBookingCommand } from '../delete-booking.command';
import { BookingError, BookingNotFoundError } from '../../../domain/exception';
import { BookingId } from '../../../domain/model/value-objects';
import { Booking } from '../../../domain/model/booking';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';

import { Logger } from 'winston';
import { Inject } from '@nestjs/common';
@CommandHandler(DeleteBookingCommand)
export class DeleteBookingHandler implements ICommandHandler<DeleteBookingCommand> {
    constructor(
        @InjectAggregateRepository(Booking)
        private readonly BookingRepository: AggregateRepository<Booking, BookingId>,
        @Inject(WINSTON_MODULE_PROVIDER)
        private readonly logger: Logger,
    ) { }

    async execute(command: DeleteBookingCommand): Promise<Result<null, BookingError>> {
        const id = BookingId.fromString(command.id);
        const booking = await this.BookingRepository.find(id)

        if (booking === null) {
            return new Err(BookingNotFoundError.withId(id));
        }

        booking.delete()
        this.BookingRepository.save(booking);

        this.logger.info("Booking removed", { bookingId: id.value });

        return new Ok(null);
    }
}

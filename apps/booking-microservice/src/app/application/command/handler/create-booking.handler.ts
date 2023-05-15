import { AggregateRepository, InjectAggregateRepository } from '@aulasoftwarelibre/nestjs-eventstore';
import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Err, Ok, Result } from 'neverthrow';
import { BookingError } from '../../../domain/exception';
import { Booking } from '../../../domain/model/booking';
import {
    BookingId, BookingSpaceId, BookingUserId, BookingDate
} from '../../../domain/model/value-objects';
import { CreateBookingCommand } from '../create-booking.command';
import { BOOKING_VALIDATOR, BookingValidator } from '../../service/booking-validator.service';


@CommandHandler(CreateBookingCommand)
export class CreateBookingHandler implements ICommandHandler<CreateBookingCommand> {
    constructor(
        @InjectAggregateRepository(Booking)
        private readonly bookingRepository: AggregateRepository<Booking, BookingId>,
        @Inject(BOOKING_VALIDATOR)
        private readonly bookingValidator: BookingValidator
    ) { }

    async execute(command: CreateBookingCommand): Promise<Result<null, BookingError>> {

        const bookingId = BookingId.random();
        const userId = BookingUserId.fromString(command.userId)
        const spaceId = BookingSpaceId.fromString(command.spaceId)

        const validatorResult = await this.bookingValidator.validate(userId, spaceId, bookingId)

        return validatorResult.match<Result<null, BookingError>>(
            (_) => {
                const bookingDate = BookingDate.fromSerializedDate(command.serializedDate)
                const booking = Booking.add(bookingId, userId, spaceId, bookingDate);
                this.bookingRepository.save(booking);

                return new Ok(null)
            },
            (err) => {

                return new Err(err)
            }
        )

    }
}

import { AggregateRepository, InjectAggregateRepository } from '@aulasoftwarelibre/nestjs-eventstore';
import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Err, Ok, Result } from 'neverthrow';

import { BookingError } from '../../../domain/exception';
import { Booking } from '../../../domain/model/booking';
import { BookingDate, BookingId, BookingSpaceId, BookingUserId } from '../../../domain/model/value-objects';
import { BOOKING_VALIDATOR, BookingValidator } from '../../service/booking-validator.service';
import { CreateBookingCommand } from '../create-booking.command';

@CommandHandler(CreateBookingCommand)
export class CreateBookingHandler implements ICommandHandler<CreateBookingCommand> {
	constructor(
		@InjectAggregateRepository(Booking)
		private readonly bookingRepository: AggregateRepository<Booking, BookingId>,
		@Inject(BOOKING_VALIDATOR)
		private readonly bookingValidator: BookingValidator,
	) {}

	async execute(command: CreateBookingCommand): Promise<Result<null, BookingError>> {
		const bookingId = BookingId.random();
		const userId = BookingUserId.fromString(command.userId);
		const spaceId = BookingSpaceId.fromString(command.spaceId);
		const bookingDate = BookingDate.fromSerializedDate(command.serializedDate);

		const validatorResult = await this.bookingValidator.validate(userId, spaceId, bookingId, bookingDate);

		return validatorResult.match<Result<null, BookingError>>(
			(_) => {
				const booking = Booking.add(bookingId, userId, spaceId, bookingDate);
				this.bookingRepository.save(booking);

				return new Ok(null);
			},
			(err) => {
				return new Err(err);
			},
		);
	}
}

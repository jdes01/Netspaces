import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { SerializedDate } from '@netspaces/domain';
import { GraphQLError } from 'graphql';

import { BookingService } from '../../service/booking.service';
import { Booking, BookingInput } from '../schema/booking.graphql-model';

@Resolver((_of: any) => Booking)
export class BookingResolver {
	constructor(private readonly bookingService: BookingService) {}

	@Query(() => String)
	sayHello(): string {
		return 'Hello World!';
	}

	@Mutation((_returns) => String)
	async createBooking(@Args('bookingInput') bookingInput: BookingInput): Promise<string> {
		const serializedDate: SerializedDate = {
			day: bookingInput.day,
			month: bookingInput.month,
			year: bookingInput.year,
		};
		const createdBookingResult = await this.bookingService.createBooking(bookingInput.userId, bookingInput.spaceId, serializedDate);

		return createdBookingResult.match<string>(
			(_) => {
				return 'Booking created successfully';
			},
			(err) => {
				throw new GraphQLError(err.message);
			},
		);
	}
}

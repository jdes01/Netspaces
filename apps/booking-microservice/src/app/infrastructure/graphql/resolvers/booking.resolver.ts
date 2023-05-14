import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

import { GraphQLError } from 'graphql';
import { Booking, BookingInput } from '../schema/booking.graphql-model';
import { BookingService } from '../../service/booking.service';
import { BookingDate } from '../../../domain/model/value-objects';
import { SerializedDate } from '@netspaces/domain';

@Resolver((_of: any) => Booking)
export class BookingResolver {
	constructor(private readonly bookingService: BookingService) { }

	@Query(() => String)
	sayHello(): string {
		return 'Hello World!';
	}

	@Mutation((_returns) => String)
	async createBooking(@Args('bookingInput') bookingInput: BookingInput): Promise<string> {

		const serializedDate: SerializedDate = JSON.parse(bookingInput.date)

		const createdBookingResult = await this.bookingService.createBooking(
			bookingInput._id,
			bookingInput.userId,
			bookingInput.workspaceId,
			bookingInput.spaceId,
			serializedDate,
		);

		return createdBookingResult.match<string>(
			(_) => {
				return 'Booking created successfully'
			},
			(err) => {
				throw new GraphQLError(err.message);
			}
		)
	}
}

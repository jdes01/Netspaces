import {
  Args,
  Mutation,
  Query,
  ResolveReference,
  Resolver,
} from '@nestjs/graphql';
import { BookingDTO } from '@netspaces/contracts';
import { GraphQLError } from 'graphql';

import { BookingService } from '../../service/booking.service';
import { Booking, BookingInput } from '../schema/booking.graphql-model';

@Resolver((_of: any) => Booking)
export class BookingResolver {
  constructor(private readonly bookingService: BookingService) {}

  @Query((_returns) => [Booking])
  async getBookingsBySpace(
    @Args('spaceId', { type: () => String }) spaceId: string,
  ): Promise<Array<BookingDTO>> {
    return await this.bookingService.getBookingsBySpace(spaceId);
  }

  @ResolveReference()
  async resolveReference(reference: {
    __typename: string;
    spaceId: string;
  }): Promise<Array<BookingDTO>> {
    return await this.bookingService.getBookingsBySpace(reference.spaceId);
  }

  @Query((_returns) => [String])
  async getSpaceUnavailableDates(
    @Args('spaceId', { type: () => String }) spaceId: string,
  ): Promise<Array<string>> {
    const spaceUnavailableDatesResult =
      await this.bookingService.getSpaceUnavailableDates(spaceId);

    return spaceUnavailableDatesResult.match<Array<string>>(
      (spaceUnavailableDate) => {
        return spaceUnavailableDate;
      },
      (err) => {
        throw new GraphQLError(err.message);
      },
    );
  }

  @Mutation((_returns) => String)
  async createBooking(
    @Args('bookingInput') bookingInput: BookingInput,
  ): Promise<string> {
    const createdBookingResult = await this.bookingService.createBooking(
      bookingInput.userId,
      bookingInput.spaceId,
      bookingInput.date,
    );

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

import { AggregateRepository, InjectAggregateRepository } from '@aulasoftwarelibre/nestjs-eventstore';
import { Inject, Logger } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Err, Ok, Result } from 'neverthrow';

import { BookingAlreadyExistsError, BookingError, BookingWorkspaceNotFoundError, BookingSpaceNotFoundError, BookingUserNotFoundError } from '../../../domain/exception';
import { Booking } from '../../../domain/model/booking';
import {
    BookingWorkspaceId, BookingId, BookingSpaceId, BookingUserId, BookingDate
} from '../../../domain/model/value-objects';
import { CreateBookingCommand } from '../create-booking.command';
import { BookingFinder, BOOKING_FINDER } from '../../service/booking-finder.service';
import { WORKSPACE_FINDER, WorkspaceFinder } from '../../service/workspace-finder.service';
import { USER_FINDER, UserFinder } from '../../service/user-finder.service';
import { SPACE_FINDER, SpaceFinder } from '../../service/space-finder.service';


@CommandHandler(CreateBookingCommand)
export class CreateBookingHandler implements ICommandHandler<CreateBookingCommand> {
    constructor(
        @InjectAggregateRepository(Booking)
        private readonly bookingRepository: AggregateRepository<Booking, BookingId>,
        @Inject(BOOKING_FINDER)
        private readonly bookingFinder: BookingFinder,
        @Inject(WORKSPACE_FINDER)
        private readonly workspaceFinder: WorkspaceFinder,
        @Inject(USER_FINDER)
        private readonly userFinder: UserFinder,
        @Inject(SPACE_FINDER)
        private readonly spaceFinder: SpaceFinder,
    ) { }

    async execute(command: CreateBookingCommand): Promise<Result<null, BookingError>> {

        const id = BookingId.random();
        if (await this.bookingFinder.find(id)) return new Err(BookingAlreadyExistsError.withId(id));

        const workspaceId = BookingWorkspaceId.fromString(command.workspaceId)
        if (await this.workspaceFinder.find(workspaceId) === null) return new Err(BookingWorkspaceNotFoundError.withWorkspaceId(workspaceId))

        const spaceId = BookingSpaceId.fromString(command.spaceId)
        if (await this.spaceFinder.find(spaceId) === null) return new Err(BookingSpaceNotFoundError.withSpaceId(spaceId))

        const userId = BookingUserId.fromString(command.userId)
        if (await this.userFinder.find(userId) === null) return new Err(BookingUserNotFoundError.withUserId(userId))

        const bookingDate = BookingDate.fromSerializedDate(command.serializedDate)

        const booking = Booking.add(id, userId, workspaceId, spaceId, bookingDate);

        this.bookingRepository.save(booking);
        return new Ok(null)
    }
}

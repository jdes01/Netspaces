import { Controller, Inject } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';
import { InjectModel } from '@nestjs/mongoose';
import { SPACE_WAS_DELETED_MESSAGE, SpaceWasDeletedMessage } from '@netspaces/contracts';
import { Model } from 'mongoose';

import { SPACE_PROJECTION, SpaceDocument } from '.././schema/space.schema';
import { CommandBus, ICommand } from '@nestjs/cqrs';
import { Result } from 'neverthrow';
import { BookingError } from '../../../domain/exception';
import { DeleteBookingCommand } from '../../../application/command/delete-booking.command';
import { BOOKING_FINDER, BookingFinder } from '../../../application/service/booking-finder.service';
import { BookingSpaceId } from '../../../domain/model/value-objects';

import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';

@Controller()
export class SpaceWasDeletedProjection {
    constructor(
        @InjectModel(SPACE_PROJECTION)
        private readonly spaceProjection: Model<SpaceDocument>,
        @Inject(BOOKING_FINDER)
        private readonly bookingFinder: BookingFinder,
        @Inject(WINSTON_MODULE_PROVIDER)
        private readonly logger: Logger,
        private readonly commandBus: CommandBus
    ) { }

    @EventPattern(SPACE_WAS_DELETED_MESSAGE)
    async handle(message: SpaceWasDeletedMessage) {
        const spaceView = await this.spaceProjection
            .findById(message._id)
            .exec();

        spaceView.remove();

        const bookingViews = await this.bookingFinder.findSpacePendingBookings(BookingSpaceId.fromString(message._id))

        bookingViews.map(
            (bookingView) => { this.commandBus.execute<ICommand, Result<null, BookingError>>(new DeleteBookingCommand(bookingView._id)) }
        )

        this.logger.info("Space removed", { spaceId: message._id });
    }
}

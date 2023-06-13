import { Controller, Inject } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';
import { InjectModel } from '@nestjs/mongoose';
import { USER_WAS_DELETED_MESSAGE, UserWasDeletedMessage } from '@netspaces/contracts';
import { Model } from 'mongoose';

import { USER_PROJECTION, UserDocument } from '../schema/user.schema';
import { BOOKING_PROJECTION, BookingDocument } from '../schema/booking.schema';
import { CommandBus, ICommand } from '@nestjs/cqrs';
import { Result } from 'neverthrow';
import { BookingError } from '../../../domain/exception';
import { DeleteBookingCommand } from '../../../application/command/delete-booking.command';

import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';

@Controller()
export class UserWasDeletedProjection {
    constructor(
        @InjectModel(USER_PROJECTION)
        private readonly userProjection: Model<UserDocument>,
        @InjectModel(BOOKING_PROJECTION)
        private readonly bookingProjection: Model<BookingDocument>,
        @Inject(WINSTON_MODULE_PROVIDER)
        private readonly logger: Logger,
        private readonly commandBus: CommandBus
    ) { }

    @EventPattern(USER_WAS_DELETED_MESSAGE)
    async handle(message: UserWasDeletedMessage) {
        const userView = await this.userProjection
            .findById(message._id)
            .exec();

        userView.remove();

        const userBookingsViews = await this.bookingProjection
            .find({ userId: message._id })
            .exec();

        if (userBookingsViews.length > 0) {
            userBookingsViews.map(
                (userBookingsView) => { this.commandBus.execute<ICommand, Result<null, BookingError>>(new DeleteBookingCommand(userBookingsView.id)) }
            )
        }

        this.logger.info("User removed", { userId: message._id });
    }
}

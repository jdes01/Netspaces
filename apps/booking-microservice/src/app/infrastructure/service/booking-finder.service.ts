import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { BookingDTO } from '@netspaces/contracts';
import { Model } from 'mongoose';

import { BookingFinder } from '../../application/service/booking-finder.service';
import { BookingId, BookingSpaceId, BookingWorkspaceId } from '../../domain/model/value-objects';
import { BOOKING_PROJECTION, BookingDocument } from '../projection/schema/booking.schema';

@Injectable()
export class MongoDBBookingFinder implements BookingFinder {
    constructor(
        @InjectModel(BOOKING_PROJECTION)
        private readonly bookingProjection: Model<BookingDocument>,
    ) { }

    find(id: BookingId): Promise<BookingDTO | null> {
        return this.bookingProjection.findById(id.value).exec();
    }
}

import { BookingDTO } from '@netspaces/contracts';
import { Document, Schema } from 'mongoose';

export const BOOKING_PROJECTION = 'bookings';

export type BookingDocument = BookingDTO & Document;

export const BookingSchema = new Schema(
    {
        _id: String,
        userId: String,
        workspaceId: String,
        spaceId: String,
        day: Number,
        month: Number,
        year: Number
    },
    {
        versionKey: false,
    },
);

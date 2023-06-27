import { BookingDTO } from '@netspaces/contracts';
import { Document, Schema } from 'mongoose';

export const BOOKING_PROJECTION = 'bookings';

export type BookingDocument = BookingDTO & Document;

export const BookingSchema = new Schema(
  {
    _id: String,
    date: Date,
    spaceId: String,
    userId: String,
  },
  {
    versionKey: false,
  },
).index({ spaceId: 1 });

import { Document, Schema } from 'mongoose';
import { SpaceDTO } from '@netspaces/contracts';

export const SPACE_PROJECTION = 'spaces';

export type SpaceDocument = SpaceDTO & Document;

export const SpaceSchema = new Schema(
    {
        _id: String,
        quantity: Number

    },
    {
        versionKey: false,
    }
);

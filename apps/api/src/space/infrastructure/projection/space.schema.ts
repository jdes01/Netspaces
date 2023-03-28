import { Document, Schema } from 'mongoose';
import { SpaceDTO } from '@netspaces/contracts';

export const SPACE_PROJECTION = 'spaces';

export type SpaceDocument = SpaceDTO & Document;

export const SpaceSchema = new Schema(
    {
        _id: String,
        workspaceId: String,
        name: String,
        quantity: Number,
        seats: Number,
        amenities: Array<String>
    },
    {
        versionKey: false,
    }
);

import { SpaceDTO } from '@netspaces/contracts';
import { Document, Schema } from 'mongoose';

export const SPACE_PROJECTION = 'spaces';

export type SpaceDocument = SpaceDTO & Document;

export const SpaceSchema = new Schema(
  {
    _id: String,
    quantity: Number,
    workspaceId: String,
  },
  {
    versionKey: false,
  },
);

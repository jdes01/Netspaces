import { Document, Schema } from 'mongoose';
import { WorkspaceDTO } from '@netspaces/contracts';

export const WORKSPACE_PROJECTION = 'WORKSPACE_PROJECTION';

export type WorkspaceDocument = WorkspaceDTO & Document;

export const WorkspaceSchema = new Schema(
    {
        _id: String,
        name: String,
        description: String,
        street: String,
        city: String,
        country: String
    },
    {
        versionKey: false,
    },
);

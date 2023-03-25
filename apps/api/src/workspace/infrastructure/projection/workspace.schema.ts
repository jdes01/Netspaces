import { Document, Schema } from 'mongoose';
import { WorkspaceDTO } from '@netspaces/contracts';

export const WORKSPACE_PROJECTION = 'workspaces';

export type WorkspaceDocument = WorkspaceDTO & Document;

export const WorkspaceSchema = new Schema(
  {
    _id: String,
    name: String,
    description: String,
    street: String,
    city: String,
    country: String,
    services: Array<string>,
  },
  {
    versionKey: false,
  }
);

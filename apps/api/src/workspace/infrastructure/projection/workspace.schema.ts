import { WorkspaceDTO } from '@netspaces/contracts';
import { Document, Schema } from 'mongoose';

export const WORKSPACE_PROJECTION = 'workspaces';

export type WorkspaceDocument = WorkspaceDTO & Document;

export const WorkspaceSchema = new Schema(
  {
    _id: String,
    companyId: String,
    name: String,
    description: String,
    street: String,
    city: String,
    country: String,
    services: Array<string>,
    images: Array<string>,
  },
  {
    versionKey: false,
  },
);

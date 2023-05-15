import { WorkspaceDTO } from '@netspaces/contracts';
import { Document, Schema } from 'mongoose';

export const WORKSPACE_PROJECTION = 'workspaces';

export type WorkspaceDocument = WorkspaceDTO & Document;

export const WorkspaceSchema = new Schema(
	{
		_id: String,
		city: String,
		country: String,
		description: String,
		name: String,
		owner: String,
		services: Array<string>,
		street: String,
	},
	{
		versionKey: false,
	},
);

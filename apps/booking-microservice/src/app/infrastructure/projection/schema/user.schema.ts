import { UserDTO } from '@netspaces/contracts';
import { Document, Schema } from 'mongoose';

export const USER_PROJECTION = 'users';

export type UserDocument = UserDTO & Document;

export const UserSchema = new Schema(
	{
		_id: String,
		name: String,
	},
	{
		versionKey: false,
	},
);

import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { WORKSPACE_PROJECTION, WorkspaceSchema } from './infrastructure/projection/schema/workspace.schema';
import { SpaceProjections, WorkspaceProjections, UserProjections } from './infrastructure/projection';
import { SPACE_PROJECTION, SpaceSchema } from './infrastructure/projection/schema/space.schema';
import { USER_PROJECTION, UserSchema } from './infrastructure/projection/schema/user.schema';


@Module({
	imports: [
		MongooseModule.forRoot(process.env.BOOKING_MICROSERVICE_MONGO_URI || "", {}),
		MongooseModule.forFeature([
			{
				name: WORKSPACE_PROJECTION,
				schema: WorkspaceSchema,
			},
			{
				name: SPACE_PROJECTION,
				schema: SpaceSchema,
			},
			{
				name: USER_PROJECTION,
				schema: UserSchema,
			},
		]),
	],
	controllers: [...WorkspaceProjections, ...SpaceProjections, ...UserProjections],
	providers: [],
})
export class BookingModule { }

import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { WORKSPACE_PROJECTION, WorkspaceSchema } from './infrastructure/projection/schema/workspace.schema';
import { SpaceProjections, WorkspaceProjections, UserProjections, BookingProjections } from './infrastructure/projection';
import { SPACE_PROJECTION, SpaceSchema } from './infrastructure/projection/schema/space.schema';
import { USER_PROJECTION, UserSchema } from './infrastructure/projection/schema/user.schema';

import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { BookingWasCreatedEvent } from './domain/event';
import { CreateBookingDTO } from '@netspaces/contracts';
import { Booking } from './domain/model/booking';

import { Event, EventStoreModule, EVENTSTORE_KEYSTORE_CONNECTION } from '@aulasoftwarelibre/nestjs-eventstore';
import { BOOKING_PROJECTION, BookingSchema } from './infrastructure/projection/schema/booking.schema';
import { CqrsModule } from '@nestjs/cqrs';
import { BookingProviders } from './app.providers';
import { CommandHandlers } from './application/command';
import { BookingService } from './infrastructure/service/booking.service';
import { BookingResolver } from './infrastructure/graphql/resolvers/booking.resolver';
import { ConfigModule } from '@nestjs/config';
import configuration from '../config/configuration';



@Module({
	imports: [
		ConfigModule.forRoot({
			envFilePath: [`.env.${process.env.NODE_ENV}.local`, `.env.${process.env.NODE_ENV}`, '.env.local', '.env'],
			isGlobal: true,
			load: [configuration],
		}),
		GraphQLModule.forRoot<ApolloDriverConfig>({
			autoSchemaFile: true,
			driver: ApolloDriver,
		}),
		CqrsModule,
		EventStoreModule.forRoot({
			connection: process.env.BOOKING_MICROSERVICE_EVENTSTORE_URI || "",
		}),
		EventStoreModule.forFeature([Booking], {
			BookingWasCreatedEvent: (event: Event<CreateBookingDTO>) =>
				new BookingWasCreatedEvent(
					event.payload._id,
					event.payload.userId,
					event.payload.workspaceId,
					event.payload.spaceId,
					event.payload.day,
					event.payload.month,
					event.payload.year,
				),
		}),
		MongooseModule.forRoot(process.env.BOOKING_MICROSERVICE_MONGO_URI || "", {}),
		MongooseModule.forRoot(process.env.BOOKING_MICROSERVICE_KEYSTORE_URI || "", {
			connectionName: EVENTSTORE_KEYSTORE_CONNECTION,
		}),

		MongooseModule.forFeature([
			{
				name: BOOKING_PROJECTION,
				schema: BookingSchema,
			},
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
	providers: [
		...CommandHandlers,
		...BookingProjections,
		...BookingProviders,
		BookingService,
		BookingResolver,
	],
})
export class BookingModule { }

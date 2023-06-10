import { Event, EVENTSTORE_KEYSTORE_CONNECTION, EventStoreModule } from '@aulasoftwarelibre/nestjs-eventstore';
import { ApolloDriver, ApolloDriverConfig, ApolloFederationDriver, ApolloFederationDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CqrsModule } from '@nestjs/cqrs';
import { GraphQLModule } from '@nestjs/graphql';
import { MongooseModule } from '@nestjs/mongoose';
import { CreateBookingDTO, DeleteBookingDTO } from '@netspaces/contracts';

import configuration from '../config/configuration';
import { BookingProviders } from './app.providers';
import { CommandHandlers } from './application/command';
import { QueryHandlers } from './application/query';
import { BookingWasCreatedEvent, BookingWasDeletedEvent } from './domain/event';
import { Booking } from './domain/model/booking';
import { BookingResolver } from './infrastructure/graphql/resolvers/booking.resolver';
import { BookingProjections, SpaceProjections, UserProjections, CompanyProjections } from './infrastructure/projection';
import { BOOKING_PROJECTION, BookingSchema } from './infrastructure/projection/schema/booking.schema';
import { SPACE_PROJECTION, SpaceSchema } from './infrastructure/projection/schema/space.schema';
import { USER_PROJECTION, UserSchema } from './infrastructure/projection/schema/user.schema';
import { COMPANY_PROJECTION, CompanySchema } from './infrastructure/projection/schema/company.schema';
import { BookingService } from './infrastructure/service/booking.service';

@Module({
	controllers: [...SpaceProjections, ...UserProjections, ...CompanyProjections],
	imports: [
		ConfigModule.forRoot({
			envFilePath: [`.env.${process.env.NODE_ENV}.local`, `.env.${process.env.NODE_ENV}`, '.env.local', '.env'],
			isGlobal: true,
			load: [configuration],
		}),
		GraphQLModule.forRoot<ApolloFederationDriverConfig>({
			autoSchemaFile: {
				federation: 2,
			},
			driver: ApolloFederationDriver,
		}),
		CqrsModule,
		EventStoreModule.forRoot({
			connection: process.env.BOOKING_MICROSERVICE_EVENTSTORE_URI || '',
		}),
		EventStoreModule.forFeature([Booking], {
			BookingWasCreatedEvent: (event: Event<CreateBookingDTO>) =>
				new BookingWasCreatedEvent(event.payload._id, event.payload.userId, event.payload.spaceId, event.payload.date),
			BookingWasDeletedEvent: (event: Event<DeleteBookingDTO>) =>
				new BookingWasDeletedEvent(event.payload._id),
		}),
		MongooseModule.forRoot(process.env.BOOKING_MICROSERVICE_MONGO_URI || '', {}),
		MongooseModule.forRoot(process.env.BOOKING_MICROSERVICE_KEYSTORE_URI || '', {
			connectionName: EVENTSTORE_KEYSTORE_CONNECTION,
		}),

		MongooseModule.forFeature([
			{
				name: BOOKING_PROJECTION,
				schema: BookingSchema,
			},
			{
				name: SPACE_PROJECTION,
				schema: SpaceSchema,
			},
			{
				name: USER_PROJECTION,
				schema: UserSchema,
			},
			{
				name: COMPANY_PROJECTION,
				schema: CompanySchema,
			},
		]),
	],
	providers: [...CommandHandlers, ...QueryHandlers, ...BookingProjections, ...BookingProviders, BookingService, BookingResolver],
})
export class BookingModule { }

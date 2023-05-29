import { Event, EventStoreModule } from '@aulasoftwarelibre/nestjs-eventstore';
import { ApolloDriver, ApolloDriverConfig, ApolloFederationDriver, ApolloFederationDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { GraphQLModule } from '@nestjs/graphql';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { logLevel } from '@nestjs/microservices/external/kafka.interface';
import { MongooseModule } from '@nestjs/mongoose';
import { CreateUserDTO } from '@netspaces/contracts';

import { RedisModule } from '../../redis.module';
import { CommandHandlers } from '../application/command';
import { QueryHandlers } from '../application/query';
import { UserWasCreatedEvent } from '../domain/event';
import { User } from '../domain/model';
import { UserResolver } from './graphql/resolvers/user.resolver';
import { MessageProducers } from './message-producer';
import { ProjectionHandlers } from './projection';
import { USER_PROJECTION, UserSchema } from './projection/user.schema';
import { UserService } from './service/user.service';
import { UserProviders } from './user.providers';

@Module({
	controllers: [],
	imports: [
		CqrsModule,
		ClientsModule.register([
			{
				name: 'DATASERVICE',
				options: {
					client: {
						brokers: ['kafka:9092'],
						clientId: 'user-producer',
						logLevel: logLevel.ERROR,
					},
					consumer: {
						groupId: 'booking-consumer',
					},
					producerOnlyMode: true,
				},
				transport: Transport.KAFKA,
			},
		]),
		EventStoreModule.forFeature([User], {
			UserWasCreatedEvent: (event: Event<CreateUserDTO>) => new UserWasCreatedEvent(event.payload._id, event.payload.name),
		}),
		MongooseModule.forFeature([
			{
				name: USER_PROJECTION,
				schema: UserSchema,
			},
		]),
		GraphQLModule.forRoot<ApolloFederationDriverConfig>({
			autoSchemaFile: {
				federation: 2,
			},
			driver: ApolloFederationDriver,
		}),
		RedisModule,
	],
	providers: [
		...CommandHandlers,
		...QueryHandlers,
		...ProjectionHandlers,
		...MessageProducers,
		...UserProviders,
		UserResolver,
		UserService,
		RedisModule,
	],
})
export class UserModule { }

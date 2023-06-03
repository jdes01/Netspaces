import { Event, EventStoreModule } from '@aulasoftwarelibre/nestjs-eventstore';
import { ApolloDriver, ApolloDriverConfig, ApolloFederationDriver, ApolloFederationDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { GraphQLModule } from '@nestjs/graphql';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { logLevel } from '@nestjs/microservices/external/kafka.interface';
import { MongooseModule } from '@nestjs/mongoose';
import { CreateCompanyDTO } from '@netspaces/contracts';

import { RedisModule } from '../../redis.module';
import { CommandHandlers } from '../application/command';
import { QueryHandlers } from '../application/query';
import { CompanyWasCreatedEvent } from '../domain/event';
import { Company } from '../domain/model';
import { CompanyResolver } from './graphql/resolvers/company.resolver';
import { MessageProducers } from './message-producer';
import { ProjectionHandlers } from './projection';
import { COMPANY_PROJECTION, CompanySchema } from './projection/company.schema';
import { CompanyService } from './service/company.service';
import { CompanyProviders } from './company.providers';

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
						clientId: 'company-producer',
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
		EventStoreModule.forFeature([Company], {
			CompanyWasCreatedEvent: (event: Event<CreateCompanyDTO>) => new CompanyWasCreatedEvent(event.payload._id, event.payload.name),
		}),
		MongooseModule.forFeature([
			{
				name: COMPANY_PROJECTION,
				schema: CompanySchema,
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
		...CompanyProviders,
		CompanyResolver,
		CompanyService,
		RedisModule,
	],
})
export class CompanyModule { }

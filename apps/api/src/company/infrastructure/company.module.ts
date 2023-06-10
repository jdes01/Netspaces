import { Event, EventStoreModule } from '@aulasoftwarelibre/nestjs-eventstore';
import { ApolloFederationDriver, ApolloFederationDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { GraphQLModule } from '@nestjs/graphql';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { logLevel } from '@nestjs/microservices/external/kafka.interface';
import { MongooseModule } from '@nestjs/mongoose';
import { CreateCompanyDTO, DeleteCompanyDTO, UpdateCompanyNameDTO } from '@netspaces/contracts';

import { RedisModule } from '../../redis.module';
import { CommandHandlers } from '../application/command';
import { QueryHandlers } from '../application/query';
import { CompanyNameWasUpdated, CompanyWasCreatedEvent, CompanyWasDeletedEvent } from '../domain/event';
import { Company } from '../domain/model';
import { CompanyResolver } from './graphql/resolvers/company.resolver';
import { MessageProducers } from './message-producer';
import { ProjectionHandlers } from './projection';
import { COMPANY_PROJECTION, CompanySchema } from './projection/company.schema';
import { CompanyService } from './service/company.service';
import { CompanyProviders } from './company.providers';
import { UserService } from '../../user/infrastructure/service/user.service';

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
			CompanyNameWasUpdated: (event: Event<UpdateCompanyNameDTO>) => new CompanyNameWasUpdated(event.payload._id, event.payload.name),
			CompanyWasDeletedEvent: (event: Event<DeleteCompanyDTO>) => new CompanyWasDeletedEvent(event.payload._id),
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
		UserService,
		CompanyService,
		RedisModule,
	],
})
export class CompanyModule { }

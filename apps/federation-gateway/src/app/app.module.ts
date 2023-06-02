import { ApolloGateway, IntrospectAndCompose } from '@apollo/gateway';
import { ApolloGatewayDriver, ApolloGatewayDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';

@Module({
	imports: [
		GraphQLModule.forRoot<ApolloGatewayDriverConfig>({
			driver: ApolloGatewayDriver,
			gateway: {
				supergraphSdl: new IntrospectAndCompose({
					subgraphs: [
						{ name: 'api', url: 'http://netspaces-api:3333/graphql' },
						{ name: 'bookings', url: 'http://netspaces-booking-microservice:3333/graphql' },
					],
				}),
			},
		}),
	],
})
export class AppModule { }
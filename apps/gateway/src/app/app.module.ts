import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { ClientsModule, Transport } from '@nestjs/microservices'

@Module({
	imports: [
		ClientsModule.register([
			{
				name: 'BOOKING_SERVICE',
				transport: Transport.KAFKA,
				options: {
					client: {
						clientId: 'booking',
						brokers: ['kafka:9092'],
					},
					consumer: {
						groupId: 'booking-consumer'
					}
				}
			},
		]),
	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule { }

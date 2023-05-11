/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { NestFactory } from '@nestjs/core';

import { AppModule } from './app/app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
	const app = await NestFactory.createMicroservice<MicroserviceOptions>(
		AppModule, {
		transport: Transport.KAFKA,
		options: {
			client: {
				brokers: ['kafka:9092'],
			},
			consumer: {
				groupId: 'booking-consumer'
			}
		}
	}
	)
	await app.listen();
}

bootstrap();

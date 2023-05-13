/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { NestFactory } from '@nestjs/core';

import { BookingModule } from './app/app.module';
import { KafkaOptions, MicroserviceOptions, Transport } from '@nestjs/microservices';
import { logLevel } from '@nestjs/microservices/external/kafka.interface';

async function bootstrap() {
	const app = await NestFactory.createMicroservice<KafkaOptions>(
		BookingModule, {
		transport: Transport.KAFKA,
		options: {
			client: {
				brokers: ['kafka:9092'],
				logLevel: logLevel.ERROR
			},
			consumer: {
				groupId: 'booking-consumer'
			},
		},
	}
	)
	await app.listen();
}

bootstrap();

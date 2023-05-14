/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { NestFactory } from '@nestjs/core';

import { BookingModule } from './app/app.module';
import { KafkaOptions, MicroserviceOptions, Transport } from '@nestjs/microservices';
import { logLevel } from '@nestjs/microservices/external/kafka.interface';

import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { Logger, MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppLoggerMiddleware } from './app.middleware';

const GLOBAL_PREFIX = 'api';


@Module({
	imports: [BookingModule],
})
export class AppModule implements NestModule {
	configure(consumer: MiddlewareConsumer) {
		consumer.apply(AppLoggerMiddleware).forRoutes('*');
	}
}


async function bootstrap() {

	const app = await NestFactory.create(AppModule);

	app.setGlobalPrefix(GLOBAL_PREFIX);

	app.enableCors({
		credentials: true,
		methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
		origin: true,
	});

	const port = process.env.PORT || 3333;

	const kafkaMicroservice = app.connectMicroservice<KafkaOptions>(
		{
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

	await app.startAllMicroservices();

	await app.listen(port);
}

bootstrap();

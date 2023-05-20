/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger, MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { KafkaOptions, Transport } from '@nestjs/microservices';
import { logLevel } from '@nestjs/microservices/external/kafka.interface';

import { AppLoggerMiddleware } from './app.middleware';
import { BookingModule } from './app/app.module';

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
		origin: "http://localhost:3000",
	});

	app.enableShutdownHooks();
	app.connectMicroservice<KafkaOptions>({
		options: {
			client: {
				brokers: ['kafka:9092'],
				clientId: 'booking-microservice',
				logLevel: logLevel.INFO,
			},
			consumer: {
				allowAutoTopicCreation: true,
				groupId: 'booking-consumer',
			},
		},
		transport: Transport.KAFKA,
	});

	app.startAllMicroservices().then(() => {
		Logger.log('Microservices are ready');
	});

	const port = process.env.PORT || 3333;
	await app.listen(port, () => {
		Logger.log('Listening at http://localhost:' + port + '/' + GLOBAL_PREFIX);
	});
}

bootstrap();

import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { AppModule } from './app.module';

const GLOBAL_PREFIX = 'api';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger:
      process.env.NODE_ENV == 'development'
        ? ['debug', 'error', 'log', 'verbose', 'warn']
        : ['error', 'warn'],
  });

  app.setGlobalPrefix(GLOBAL_PREFIX);

  app.enableCors({
    credentials: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    origin: 'http://localhost:3000',
    allowedHeaders: [
      'Accept-Language',
      'Access-Control-Allow-Origin',
      'Access-Control-Allow-Methods',
      'Access-Control-Allow-Headers',
    ],
    exposedHeaders: [
      'Content-Length',
      'Content-Type',
      'Accept-Language',
      'Access-Control-Allow-Origin',
      'Access-Control-Allow-Methods',
      'Access-Control-Allow-Headers',
    ],
  });

  const options = new DocumentBuilder()
    .addBearerAuth()
    .setTitle('Netspaces API')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, options, {});
  SwaggerModule.setup(GLOBAL_PREFIX, app, document);

  const port = process.env.PORT || 3333;
  await app.listen(port, () => {
    Logger.log('Listening at http://localhost:' + port + '/' + GLOBAL_PREFIX);
  });
}

bootstrap();

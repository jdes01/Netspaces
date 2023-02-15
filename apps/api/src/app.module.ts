import { DynamicModule, MiddlewareConsumer, NestModule } from '@nestjs/common';

import { AppLoggerMiddleware } from './app.middleware';
import { BootstrapModule } from './bootstrap.module';
import { WorkspaceModule } from './workspace/index';


export class AppModule implements NestModule {
  static forRoot(): DynamicModule {
    return {
      module: this,
      imports: [BootstrapModule, WorkspaceModule],
    };
  }

  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AppLoggerMiddleware).forRoutes('*');
  }
}
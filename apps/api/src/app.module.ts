import { DynamicModule, MiddlewareConsumer, NestModule } from '@nestjs/common';

import { AppLoggerMiddleware } from './app.middleware';
import { BootstrapModule } from './bootstrap.module';
import { WorkspaceModule } from './workspace/index';
import { SpaceModule } from './space/index';


export class AppModule implements NestModule {
  static forRoot(): DynamicModule {
    return {
      module: this,
      imports: [BootstrapModule, WorkspaceModule, SpaceModule],
    };
  }

  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AppLoggerMiddleware).forRoutes('*');
  }
}
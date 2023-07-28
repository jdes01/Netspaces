import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';

import { AppLoggerMiddleware } from './app.middleware';
import { BootstrapModule } from './bootstrap.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [BootstrapModule, AuthModule],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AppLoggerMiddleware).forRoutes('*');
  }
}

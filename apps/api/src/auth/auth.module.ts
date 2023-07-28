import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { PassportModule } from '@nestjs/passport';

import { JwtStrategy } from './jwt.strategy';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { jwtConstants } from './constants';
import { UserService } from '../user/infrastructure/service/user.service';
import { CqrsModule } from '@nestjs/cqrs';

@Module({
    imports: [
        CqrsModule,
        PassportModule,
        JwtModule.register({
            secret: jwtConstants.secret,
        }),
    ],
    controllers: [AuthController],
    providers: [AuthService, JwtStrategy, UserService],
    exports: [AuthService],
})
export class AuthModule { }

import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { jwtConstants } from './constants';
import UserEntity from './user.entity';
import nextAuthExtractor from './utils/next-auth-extractor';
import { v4 as uuid } from 'uuid';
import { UserService } from '../user/infrastructure/service/user.service';
import { Injectable } from '@nestjs/common';

interface JwtPayload {
    sub: string;
    name: string
    email: string;
    picture: string;
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        private readonly userService: UserService,
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromExtractors([nextAuthExtractor]),
            ignoreExpiration: false,
            secretOrKey: jwtConstants.secret,
        });
    }

    async validate(payload: JwtPayload): Promise<UserEntity> {
        const existingUser = await this.userService.getUserByMail(payload.email)

        existingUser ?? this.userService.createUserWithoutCompany(uuid(), payload.name, payload.email)

        return { id: existingUser._id, name: payload.name, email: payload.email, picture: payload.picture } as UserEntity;
    }
}
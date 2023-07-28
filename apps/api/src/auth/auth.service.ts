import { Injectable } from '@nestjs/common';
import { jwtDecrypt } from 'jose';
import { jwtConstants } from './constants';

@Injectable()
export class AuthService {
    async getToken(token: string | Buffer) {
        return jwtDecrypt(
            token,
            jwtConstants.getDerivedEncryptionKey as Uint8Array,
            {
                clockTolerance: 15,
            }
        ).then(({ payload }) => payload);
    }
}
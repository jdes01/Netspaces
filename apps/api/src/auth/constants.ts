import { hkdfSync } from 'crypto';

export const jwtConstants = {
    secret: process.env.NEXTAUTH_SECRET,
    getDerivedEncryptionKey: hkdfSync(
        'sha256',
        process.env.NEXTAUTH_SECRET,
        '',
        'NextAuth.js Generated Encryption Key',
        32
    ),
};
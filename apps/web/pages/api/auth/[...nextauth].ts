import { SignJWT, jwtVerify } from 'jose';
import NextAuth, { AuthOptions } from 'next-auth';
import { JWT } from 'next-auth/jwt';
import GithubProvider from 'next-auth/providers/github';

const DEFAULT_MAX_AGE = 30 * 24 * 60 * 60; // 30 days

const now = () => (Date.now() / 1000) | 0;

export const authOptions: AuthOptions = {
    jwt: {
        async encode(params): Promise<string> {
            const { token = {}, secret, maxAge = DEFAULT_MAX_AGE } = params;
            const encodedSecret = new TextEncoder().encode(secret.toString());

            return await new SignJWT(token)
                .setProtectedHeader({ alg: 'HS256' })
                .setIssuedAt()
                .setExpirationTime(now() + maxAge)
                .sign(encodedSecret);
        },
        async decode(params): Promise<JWT | null> {
            const { token, secret } = params;

            if (!token) return null;

            const encodedSecret = new TextEncoder().encode(secret.toString());

            const { payload } = await jwtVerify(token, encodedSecret);

            return payload;
        },
    },
    // Configure one or more authentication providers
    providers: [
        GithubProvider({
            clientId: process.env.GITHUB_CLIENT_ID || "clientId",
            clientSecret: process.env.GITHUB_CLIENT_SECRET || "clientSecret",
        }),
        // ...add more providers here
    ],
};

export default NextAuth(authOptions);
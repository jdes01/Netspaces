import { JwtFromRequestFunction } from 'passport-jwt';

const nextAuthExtractor: JwtFromRequestFunction = function (req) {
    const token = null;

    if (req && req.cookies) {
        return req.cookies['next-auth.session-token'];
    }

    return token;
};

export default nextAuthExtractor;
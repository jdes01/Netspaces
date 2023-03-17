import { createConnection } from 'mongoose';

export const MONGODB_CONNECTION = 'MONGODB_CONNECTION';

export const mongoConnectionProvider = {
    provide: MONGODB_CONNECTION,
    useFactory: async () =>
        createConnection(process.env.MONGO_DB_URI),
};

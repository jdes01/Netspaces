import { Module } from '@nestjs/common';

import { mongoConnectionProvider } from './mongodb.provider';

@Module({
    providers: [mongoConnectionProvider],
    exports: [mongoConnectionProvider],
})
export class DatabaseModule { }

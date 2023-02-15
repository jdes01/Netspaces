import { Module } from '@nestjs/common';
import { EventSourcingModule } from 'event-sourcing-nestjs';

@Module({
    imports: [
        EventSourcingModule.forRoot({
            mongoURL: process.env.MONGO_EVENT_STORE_URI,
        }),
    ],
    providers: [],
})
export class BootstrapModule { }
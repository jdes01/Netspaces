import { Module, OnModuleInit } from '@nestjs/common';
import { EventBus } from '@nestjs/cqrs';
import { EventSourcingModule } from 'event-sourcing-nestjs';

@Module({
    imports: [
        EventSourcingModule.forRoot({
            mongoURL: process.env.MONGO_EVENT_STORE_URI,
        }),
    ],
    providers: [],
})
export class BootstrapModule implements OnModuleInit {
    constructor(
        private readonly event$: EventBus,
    ) { }

    onModuleInit() { }
}
import { StorableEvent } from 'event-sourcing-nestjs';
export class SpaceWasCreated implements StorableEvent {

    eventAggregate: string = 'space';
    eventVersion: number = 1;
    eventName: string = 'space-was-created'

    constructor(public readonly id: string, public readonly name: string, public readonly quantity: number, public readonly seats: number) { }
}
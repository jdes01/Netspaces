import { Event } from '@aulasoftwarelibre/nestjs-eventstore';

export class SpaceWasCreatedEvent extends Event {

    constructor(
        public readonly id: string,
        public readonly name: string,
        public readonly quantity: number,
        public readonly seats: number,
    ) {
        super(id, { _id: id, name, quantity, seats });
    }
}
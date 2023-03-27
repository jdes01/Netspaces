import { Event } from '@aulasoftwarelibre/nestjs-eventstore';

export class SpaceWasCreatedEvent extends Event {

    constructor(
        public readonly id: string,
        public readonly quantity: number,
    ) {
        super(id, { _id: id, quantity });
    }
}
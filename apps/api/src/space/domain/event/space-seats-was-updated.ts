import { Event } from '@aulasoftwarelibre/nestjs-eventstore';

export class SpaceSeatsWasUpdatedEvent extends Event {
    constructor(
        public readonly id: string,
        public readonly seats: number,
    ) {
        super(id, {
            _id: id,
            seats,
        });
    }
}

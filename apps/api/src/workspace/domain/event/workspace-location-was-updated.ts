import { Event } from '@aulasoftwarelibre/nestjs-eventstore';

export class WorkspaceLocationWasUpdatedEvent extends Event {
    constructor(
        public readonly id: string,
        public readonly street: string,
        public readonly city: string,
        public readonly country: string,
    ) {
        super(id, {
            _id: id,
            street,
            city,
            country,
        });
    }
}

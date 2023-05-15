import { Event } from '@aulasoftwarelibre/nestjs-eventstore';

export class BookingWasCreatedEvent extends Event {
    constructor(
        public readonly id: string,
        public readonly userId: string,
        public readonly workspaceId: string,
        public readonly spaceId: string,
        public readonly day: number,
        public readonly month: number,
        public readonly year: number,
    ) {
        super(id, {
            _id: id,
            userId,
            workspaceId,
            spaceId,
            day,
            month,
            year
        });
    }
}

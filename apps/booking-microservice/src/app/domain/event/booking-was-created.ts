import { Event } from '@aulasoftwarelibre/nestjs-eventstore';
import { SerializedDate } from '@netspaces/domain';

export class BookingWasCreatedEvent extends Event {
    constructor(
        public readonly id: string,
        public readonly userId: string,
        public readonly workspaceId: string,
        public readonly spaceId: string,
        public readonly date: SerializedDate,
    ) {
        super(id, {
            _id: id,
            userId,
            workspaceId,
            spaceId,
            date
        });
    }
}

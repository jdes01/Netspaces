import { Id } from '@aulasoftwarelibre/nestjs-eventstore';
import { v4 as uuid } from 'uuid';

export class BookingWorkspaceId extends Id {
    static generate(): BookingWorkspaceId {
        return new BookingWorkspaceId(uuid());
    }

    public static fromString(id: string): BookingWorkspaceId {
        return new BookingWorkspaceId(id);
    }

    get value(): string {
        return this.props.value;
    }
}

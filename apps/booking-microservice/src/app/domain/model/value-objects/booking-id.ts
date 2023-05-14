import { Id } from '@aulasoftwarelibre/nestjs-eventstore';
import { v4 as uuid } from 'uuid';

export class BookingId extends Id {
    static generate(): BookingId {
        return new BookingId(uuid());
    }

    public static fromString(id: string): BookingId {
        return new BookingId(id);
    }

    get value(): string {
        return this.props.value;
    }
}

import { Id } from '@aulasoftwarelibre/nestjs-eventstore';
import { v4 as uuid } from 'uuid';

export class BookingCompanyId extends Id {
    static generate(): BookingCompanyId {
        return new BookingCompanyId(uuid());
    }

    public static fromString(id: string): BookingCompanyId {
        return new BookingCompanyId(id);
    }

    get value(): string {
        return this.props.value;
    }
}

import { Id } from '@aulasoftwarelibre/nestjs-eventstore';
import { v4 as uuid } from 'uuid';

export class BookingSpaceId extends Id {
  static generate(): BookingSpaceId {
    return new BookingSpaceId(uuid());
  }

  public static fromString(id: string): BookingSpaceId {
    return new BookingSpaceId(id);
  }

  get value(): string {
    return this.props.value;
  }
}

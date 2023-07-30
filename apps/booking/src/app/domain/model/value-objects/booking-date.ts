import { ValueObject } from '@netspaces/domain';
import { format, parse } from 'date-fns';

export class BookingDate extends ValueObject<{ date: Date }> {
  public static fromSerializedDate(serializedDate: string): BookingDate {
    return new BookingDate({
      date: new Date(serializedDate),
    });
  }

  public toSerializedDate(): string {
    return this.props.date.toISOString();
  }
}

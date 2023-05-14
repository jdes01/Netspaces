import { SerializedDate, ValueObject } from '@netspaces/domain';

export class BookingDate extends ValueObject<{ day: number, month: number, year: number }> {
    public static fromNumbers(day: number, month: number, year: number): BookingDate {
        return new BookingDate({ day: day, month: month, year: year });
    }

    get day() {
        return this.props.day;
    }

    get month() {
        return this.props.month;
    }

    get year() {
        return this.props.year;
    }

    public static fromSerializedDate(serializedDate: SerializedDate): BookingDate {
        return new BookingDate({ day: serializedDate.day, month: serializedDate.month, year: serializedDate.year });
    }

    public static toSerializedDate(date: BookingDate): SerializedDate {
        return { day: date.day, month: date.month, year: date.year }
    }

    public toSerializedDate(): SerializedDate {
        return { day: this.day, month: this.month, year: this.year }
    }
}

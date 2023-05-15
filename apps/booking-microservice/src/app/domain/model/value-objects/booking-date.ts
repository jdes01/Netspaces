import { SerializedDate, ValueObject } from '@netspaces/domain';

export class BookingDate extends ValueObject<{ day: number; month: number; year: number }> {
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
		return this.fromNumbers(serializedDate.day, serializedDate.month, serializedDate.year);
	}

	public toSerializedDate(): SerializedDate {
		return { day: this.day, month: this.month, year: this.year };
	}
}

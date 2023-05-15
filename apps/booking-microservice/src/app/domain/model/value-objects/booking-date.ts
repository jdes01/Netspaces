import { ValueObject } from '@netspaces/domain';
import { format, parse } from 'date-fns'

export class BookingDate extends ValueObject<{ date: Date }> {

	public static fromSerializedDate(serializedDate: string): BookingDate {
		return new BookingDate({ date: parse(serializedDate, 'dd-MM-yyyy', new Date()) });
	}

	public toSerializedDate(): string {
		return format(this.props.date, 'dd-MM-yyyy');
	}

}

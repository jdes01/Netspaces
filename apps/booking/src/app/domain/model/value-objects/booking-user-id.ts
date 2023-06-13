import { Id } from '@aulasoftwarelibre/nestjs-eventstore';
import { v4 as uuid } from 'uuid';

export class BookingUserId extends Id {
	static generate(): BookingUserId {
		return new BookingUserId(uuid());
	}

	public static fromString(id: string): BookingUserId {
		return new BookingUserId(id);
	}

	get value(): string {
		return this.props.value;
	}
}

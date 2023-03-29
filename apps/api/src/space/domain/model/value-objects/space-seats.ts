import { ValueObject } from '@aulasoftwarelibre/nestjs-eventstore';

export class SpaceSeats extends ValueObject<{ value: number }> {
	public static fromNumber(seats: number): SpaceSeats {
		return new SpaceSeats({ value: seats });
	}

	get value(): number {
		return this.props.value;
	}
}

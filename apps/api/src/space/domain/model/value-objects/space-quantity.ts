import { ValueObject } from '@aulasoftwarelibre/nestjs-eventstore';

export class SpaceQuantity extends ValueObject<{ value: number }> {
	public static fromNumber(quantity: number): SpaceQuantity {
		return new SpaceQuantity({ value: quantity });
	}

	get value(): number {
		return this.props.value;
	}
}

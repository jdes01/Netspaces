import { ValueObject } from '@aulasoftwarelibre/nestjs-eventstore';

export class SpaceName extends ValueObject<{ value: string }> {
	public static fromString(name: string): SpaceName {
		return new SpaceName({ value: name });
	}

	get value(): string {
		return this.props.value;
	}
}

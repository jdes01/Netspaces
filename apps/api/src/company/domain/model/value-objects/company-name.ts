import { ValueObject } from '@netspaces/domain';

export class CompanyName extends ValueObject<{ value: string }> {
	public static fromString(name: string): CompanyName {
		return new CompanyName({ value: name });
	}

	get value() {
		return this.props.value;
	}
}

import { ValueObject } from '@netspaces/domain';

export class WorkspaceDescription extends ValueObject<{ value: string }> {
	public static fromString(description: string): WorkspaceDescription {
		return new WorkspaceDescription({ value: description });
	}

	get value() {
		return this.props.value;
	}
}

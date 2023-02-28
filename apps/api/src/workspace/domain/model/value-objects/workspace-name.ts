import { ValueObject } from '@netspaces/domain';

export class WorkspaceName extends ValueObject<{ value: string }> {

    public static fromString(name: string): WorkspaceName {
        return new WorkspaceName({ value: name });
    }

    get value() {
        return this.props.value;
    }
}

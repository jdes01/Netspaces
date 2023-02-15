import { ValueObject } from '@netspaces/domain';

export class WorkspaceId extends ValueObject<{ value: string }> {

    public static fromString(id: string): WorkspaceId {
        return new WorkspaceId({ value: id });
    }

    get value() {
        return this.props.value;
    }
}

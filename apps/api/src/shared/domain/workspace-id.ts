import { ValueObject } from '@netspaces/domain';

export class UserId extends ValueObject<{ value: string }> {
    public static fromString(id: string): UserId {
        return new UserId({ value: id });
    }

    get value() {
        return this.props.value;
    }
}

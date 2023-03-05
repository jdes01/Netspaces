import { ValueObject } from '@netspaces/domain';

export class SpaceName extends ValueObject<{ value: string }> {

    public static fromString(name: string): SpaceName {
        return new SpaceName({ value: name });
    }

    get value() {
        return this.props.value;
    }
}

import { ValueObject } from '@netspaces/domain';

export class SpaceId extends ValueObject<{ value: string }> {

    public static fromString(id: string): SpaceId {
        return new SpaceId({ value: id });
    }

    get value() {
        return this.props.value;
    }
}

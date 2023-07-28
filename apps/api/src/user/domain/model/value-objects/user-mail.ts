import { ValueObject } from '@netspaces/domain';

export class UserMail extends ValueObject<{ value: string }> {
    public static fromString(mail: string): UserMail {
        return new UserMail({ value: mail });
    }

    get value() {
        return this.props.value;
    }
}

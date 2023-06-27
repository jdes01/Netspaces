import { ValueObject } from '@netspaces/domain';

export class UserName extends ValueObject<{ value: string }> {
  public static fromString(name: string): UserName {
    return new UserName({ value: name });
  }

  get value() {
    return this.props.value;
  }
}

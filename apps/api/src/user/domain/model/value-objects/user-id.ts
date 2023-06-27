import { Id } from '@aulasoftwarelibre/nestjs-eventstore';
import { v4 as uuid } from 'uuid';

export class UserId extends Id {
  static generate(): UserId {
    return new UserId(uuid());
  }

  public static fromString(id: string): UserId {
    return new UserId(id);
  }

  get value(): string {
    return this.props.value;
  }
}

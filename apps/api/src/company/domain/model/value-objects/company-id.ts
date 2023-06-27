import { Id } from '@aulasoftwarelibre/nestjs-eventstore';
import { v4 as uuid } from 'uuid';

export class CompanyId extends Id {
  static generate(): CompanyId {
    return new CompanyId(uuid());
  }

  public static fromString(id: string): CompanyId {
    return new CompanyId(id);
  }

  get value(): string {
    return this.props.value;
  }
}

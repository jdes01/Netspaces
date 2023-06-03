import { Id } from '@aulasoftwarelibre/nestjs-eventstore';
import { v4 as uuid } from 'uuid';

export class UserCompanyId extends Id {
    static generate(): UserCompanyId {
        return new UserCompanyId(uuid());
    }

    public static fromString(id: string): UserCompanyId {
        return new UserCompanyId(id);
    }

    get value(): string {
        return this.props.value;
    }
}

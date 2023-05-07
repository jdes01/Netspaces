import { Id } from '@aulasoftwarelibre/nestjs-eventstore';
import { v4 as uuid } from 'uuid';

export class WorkspaceOwnerId extends Id {
    static generate(): WorkspaceOwnerId {
        return new WorkspaceOwnerId(uuid());
    }

    public static fromString(id: string): WorkspaceOwnerId {
        return new WorkspaceOwnerId(id);
    }

    get value(): string {
        return this.props.value;
    }
}

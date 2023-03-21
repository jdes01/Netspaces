import { Id } from '@aulasoftwarelibre/nestjs-eventstore';
import { v4 as uuid } from 'uuid';

export class WorkspaceId extends Id {
    static generate(): WorkspaceId {
        return new WorkspaceId(uuid());
    }

    public static fromString(id: string): WorkspaceId {
        return new WorkspaceId(id);
    }

    get value(): string {
        return this.props.value;
    }
}

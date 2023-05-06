import { Id } from '@aulasoftwarelibre/nestjs-eventstore';
import { v4 as uuid } from 'uuid';

export class WorkspaceOwner extends Id {
    static generate(): WorkspaceOwner {
        return new WorkspaceOwner(uuid());
    }

    public static fromString(id: string): WorkspaceOwner {
        return new WorkspaceOwner(id);
    }

    get value(): string {
        return this.props.value;
    }
}

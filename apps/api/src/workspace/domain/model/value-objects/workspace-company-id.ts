import { Id } from '@aulasoftwarelibre/nestjs-eventstore';
import { v4 as uuid } from 'uuid';

export class WorkspaceCompanyId extends Id {
	static generate(): WorkspaceCompanyId {
		return new WorkspaceCompanyId(uuid());
	}

	public static fromString(id: string): WorkspaceCompanyId {
		return new WorkspaceCompanyId(id);
	}

	get value(): string {
		return this.props.value;
	}
}

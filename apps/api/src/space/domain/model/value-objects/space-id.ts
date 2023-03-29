import { Id } from '@aulasoftwarelibre/nestjs-eventstore';
import { v4 as uuid } from 'uuid';

export class SpaceId extends Id {
	static generate(): SpaceId {
		return new SpaceId(uuid());
	}

	public static fromString(id: string): SpaceId {
		return new SpaceId(id);
	}

	get value(): string {
		return this.props.value;
	}
}

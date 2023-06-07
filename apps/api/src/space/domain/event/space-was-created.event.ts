import { Event } from '@aulasoftwarelibre/nestjs-eventstore';

export class SpaceWasCreatedEvent extends Event {
	constructor(
		public readonly id: string,
		public readonly workspaceId: string,
		public readonly name: string,
		public readonly quantity: number,
		public readonly seats: number,
		public readonly amenitys: Array<string>,
	) {
		super(id, {
			_id: id,
			amenitys: amenitys,
			name,
			quantity,
			seats,
			workspaceId,
		});
	}
}

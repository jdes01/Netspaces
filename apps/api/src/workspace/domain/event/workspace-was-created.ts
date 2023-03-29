import { Event } from '@aulasoftwarelibre/nestjs-eventstore';
export class WorkspaceWasCreatedEvent extends Event {
	constructor(
		public readonly id: string,
		public readonly name: string,
		public readonly description: string,
		public readonly street: string,
		public readonly city: string,
		public readonly country: string,
		public readonly services: Array<string>,
	) {
		super(id, {
			_id: id,
			name,
			description,
			street,
			city,
			country,
			services,
		});
	}
}

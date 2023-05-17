import { Event } from '@aulasoftwarelibre/nestjs-eventstore';

export class BookingWasCreatedEvent extends Event {
	constructor(public readonly id: string, public readonly userId: string, public readonly spaceId: string, public readonly date: string) {
		super(id, {
			_id: id,
			date,
			spaceId,
			userId,
		});
	}
}

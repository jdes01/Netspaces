import { Event } from '@aulasoftwarelibre/nestjs-eventstore';
import { CreateBookingDTO } from '@netspaces/contracts';

export class BookingWasCreatedEvent extends Event<CreateBookingDTO> {
	constructor(public readonly id: string, public readonly userId: string, public readonly spaceId: string, public readonly date: string) {
		super(id, {
			_id: id,
			date,
			spaceId,
			userId,
		});
	}
}

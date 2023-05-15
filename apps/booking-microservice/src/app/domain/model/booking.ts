import { AggregateRoot } from '@aulasoftwarelibre/nestjs-eventstore';

import { BookingWasCreatedEvent, BookingWasDeleted } from '../event';
import { BookingDate, BookingId, BookingSpaceId, BookingUserId } from './value-objects';

export class Booking extends AggregateRoot {
	private _id!: BookingId;
	private _userId!: BookingUserId;
	private _spaceId!: BookingSpaceId;
	private _date!: BookingDate;
	private _deleted: boolean;

	public static add(id: BookingId, userId: BookingUserId, spaceId: BookingSpaceId, date: BookingDate): Booking {
		const booking = new Booking();

		const event = new BookingWasCreatedEvent(
			id.value,
			userId.value,
			spaceId.value,
			date.day,
			date.month,
			date.year,
		);

		booking.apply(event);

		return booking;
	}

	private onBookingWasCreatedEvent(event: BookingWasCreatedEvent): void {
		this._id = BookingId.fromString(event.id);
		this._userId = BookingUserId.fromString(event.userId);
		this._spaceId = BookingSpaceId.fromString(event.spaceId);
		this._date = BookingDate.fromNumbers(event.day, event.month, event.year);

		this._deleted = false;
	}

	private onBookingWasDeletedEvent(_event: BookingWasDeleted): void {
		this._deleted = true;
	}

	public aggregateId(): string {
		return this._id.value;
	}

	public get id(): BookingId {
		return this._id;
	}

	public get userId(): BookingUserId {
		return this._userId;
	}

	public get spaceId(): BookingSpaceId {
		return this._spaceId;
	}

	public get date(): BookingDate {
		return this._date;
	}
}

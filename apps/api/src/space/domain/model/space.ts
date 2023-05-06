import { AggregateRoot } from '@aulasoftwarelibre/nestjs-eventstore';
import { WorkspaceId } from '../../../workspace/domain/model/value-objects';

import { SpaceWasCreatedEvent } from '../event';
import { SpaceId, SpaceName, SpaceQuantity, SpaceSeats } from './value-objects';
import { SpaceAmenity } from './value-objects/space-amenities';
import { SpaceAmenityNotValidError } from '../exception';

export class Space extends AggregateRoot {
	private _id!: SpaceId;
	private _workspaceId!: WorkspaceId;
	private _name!: SpaceName;
	private _quantity!: SpaceQuantity;
	private _seats!: SpaceSeats;
	private _amenities!: Array<SpaceAmenity>;
	private _deleted!: boolean | null;

	public static add(
		id: SpaceId,
		workspaceId: WorkspaceId,
		name: SpaceName,
		quantity: SpaceQuantity,
		seats: SpaceSeats,
		amenities: Array<SpaceAmenity>,
	): Space {
		const space = new Space();

		const event = new SpaceWasCreatedEvent(
			id.value,
			workspaceId.value,
			name.value,
			quantity.value,
			seats.value,
			amenities.map((amenity) => amenity.value),
		);

		space.apply(event);

		return space;
	}

	private onSpaceWasCreatedEvent(event: SpaceWasCreatedEvent): void {
		this._id = SpaceId.fromString(event.id);
		this._workspaceId = WorkspaceId.fromString(event.workspaceId);
		this._name = SpaceName.fromString(event.name);
		this._quantity = SpaceQuantity.fromNumber(event.quantity);
		this._seats = SpaceSeats.fromNumber(event.seats);

		SpaceAmenity.fromStringList(event.amenities).match(
			(amenities) => {
				this._amenities = amenities
			},
			(_) => {
				throw new SpaceAmenityNotValidError()
			}
		)

		this._deleted = null;
	}

	public aggregateId(): string {
		return this._id.value;
	}

	public get id(): SpaceId {
		return this._id;
	}

	public get workspaceId(): WorkspaceId {
		return this._workspaceId;
	}

	public get name(): SpaceName {
		return this._name;
	}

	public get quantity(): SpaceQuantity {
		return this._quantity;
	}

	public get seats(): SpaceSeats {
		return this._seats;
	}

	public get amenities(): Array<SpaceAmenity> {
		return this._amenities;
	}

	public get deleted(): boolean {
		return this._deleted;
	}
}

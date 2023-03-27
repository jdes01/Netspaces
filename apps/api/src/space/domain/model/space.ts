import { AggregateRoot } from '@aulasoftwarelibre/nestjs-eventstore';

import { SpaceWasCreatedEvent } from '../event'
import { SpaceId, SpaceQuantity, SpaceSeats } from './value-objects';

export class Space extends AggregateRoot {

    private _id: SpaceId;
    private _quantity: SpaceQuantity;
    private _seats: SpaceSeats;
    private _deleted: boolean;

    public static add(id: SpaceId, quantity: SpaceQuantity, seats: SpaceSeats): Space {

        const space = new Space();

        const event = new SpaceWasCreatedEvent(id.value, quantity.value, seats.value);

        space.apply(event);

        return space;
    }

    private onSpaceWasCreatedEvent(event: SpaceWasCreatedEvent): void {
        this._id = SpaceId.fromString(event.id);
        this._quantity = SpaceQuantity.fromNumber(event.quantity)
        this._seats = SpaceSeats.fromNumber(event.seats)
        this._deleted = null;
    }

    public aggregateId(): string {
        return this._id.value;
    }

    public get id(): SpaceId {
        return this._id;
    }

    public get seats(): SpaceSeats {
        return this._seats;
    }

    public get quantity(): SpaceQuantity {
        return this._quantity;
    }

    public get deleted(): boolean {
        return this._deleted
    }
}
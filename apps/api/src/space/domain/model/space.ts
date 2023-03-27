import { AggregateRoot } from '@aulasoftwarelibre/nestjs-eventstore';

import { SpaceWasCreatedEvent } from '../event'
import { SpaceId, SpaceName, SpaceQuantity, SpaceSeats } from './value-objects';

export class Space extends AggregateRoot {

    private _id: SpaceId;
    private _name: SpaceName;
    private _quantity: SpaceQuantity;
    private _seats: SpaceSeats;
    private _deleted: boolean;

    public static add(id: SpaceId, name: SpaceName, quantity: SpaceQuantity, seats: SpaceSeats): Space {

        const space = new Space();

        const event = new SpaceWasCreatedEvent(id.value, name.value, quantity.value, seats.value);

        space.apply(event);

        return space;
    }

    private onSpaceWasCreatedEvent(event: SpaceWasCreatedEvent): void {
        this._id = SpaceId.fromString(event.id);
        this._name = SpaceName.fromString(event.name)
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

    public get name(): SpaceName {
        return this._name;
    }

    public get quantity(): SpaceQuantity {
        return this._quantity;
    }

    public get seats(): SpaceSeats {
        return this._seats;
    }


    public get deleted(): boolean {
        return this._deleted
    }
}
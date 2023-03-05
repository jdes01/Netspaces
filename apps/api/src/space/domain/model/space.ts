import { DeletionDate } from '@netspaces/domain'

import { SpaceId, SpaceName, SpaceAmenity } from "../model/value-objects";

import { SpaceWasCreated } from "../event/space-was-created"
import { AggregateRoot } from '@nestjs/cqrs';



export class Space extends AggregateRoot {

    private _id: SpaceId;
    private _name: SpaceName;
    private _quantity: number;
    private _seats: number;
    private _amenities: Array<SpaceAmenity> = [];
    private _deleted: DeletionDate;

    private constructor() {
        super()
    }

    public static add(id: SpaceId, name: SpaceName, quantity: number, seats: number): Space {

        const space = new Space();

        space.apply(new SpaceWasCreated(id.value, name.value, quantity, seats));

        return space;
    }

    private onSpaceWasCreated(event: SpaceWasCreated): void {
        this._id = SpaceId.fromString(event.id);
        this._name = SpaceName.fromString(event.name)
        this._quantity = event.quantity
        this._seats = event.seats
        this._deleted = null;
    }

    public get id(): SpaceId {
        return this._id;
    }

    public get deleted(): DeletionDate | null {
        return this._deleted
    }

    public get name(): SpaceName {
        return this._name
    }

    public get quantity(): number {
        return this._quantity
    }

    public get seats(): number {
        return this._seats
    }

    public get amenities(): Array<SpaceAmenity> {
        return this._amenities
    }

    public add_amenity(amenity: SpaceAmenity) {
        this._amenities.push(amenity)
    }
}
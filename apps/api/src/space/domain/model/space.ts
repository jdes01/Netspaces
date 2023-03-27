import { AggregateRoot } from '@aulasoftwarelibre/nestjs-eventstore';

import { SpaceId } from "./value-objects/";

import { SpaceWasCreatedEvent } from '../event'
import { SpaceQuantity } from './value-objects/space-quantity';

export class Space extends AggregateRoot {

    private _id: SpaceId;
    private _quantity: SpaceQuantity;
    private _deleted: boolean;

    public static add(id: SpaceId, quantity: SpaceQuantity): Space {

        const space = new Space();

        const event = new SpaceWasCreatedEvent(id.value, quantity.value);

        space.apply(event);

        return space;
    }

    private onSpaceWasCreatedEvent(event: SpaceWasCreatedEvent): void {
        this._id = SpaceId.fromString(event.id);
        this._quantity = SpaceQuantity.fromNumber(event.quantity)
        this._deleted = null;
    }

    public aggregateId(): string {
        return this._id.value;
    }

    public get id(): SpaceId {
        return this._id;
    }

    public get quantity(): SpaceQuantity {
        return this._quantity;
    }

    public get deleted(): boolean {
        return this._deleted
    }
}
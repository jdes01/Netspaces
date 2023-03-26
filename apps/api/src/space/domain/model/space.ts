import { AggregateRoot } from '@aulasoftwarelibre/nestjs-eventstore';

import { SpaceId } from "./value-objects/";

import { SpaceWasCreatedEvent } from '../event'

export class Space extends AggregateRoot {

    private _id: SpaceId;
    private _deleted: boolean;

    public static add(id: SpaceId): Space {

        const space = new Space();

        const event = new SpaceWasCreatedEvent(id.value);

        space.apply(event);

        return space;
    }

    private onSpaceWasCreatedEvent(event: SpaceWasCreatedEvent): void {
        this._id = SpaceId.fromString(event.id);
        this._deleted = null;
    }

    public aggregateId(): string {
        return this._id.value;
    }

    public get id(): SpaceId {
        return this._id;
    }

    public get deleted(): boolean {
        return this._deleted
    }
}
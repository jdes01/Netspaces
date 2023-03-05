import { StorableEvent } from 'event-sourcing-nestjs';
import { SpaceId, SpaceName } from '../model/value-objects';

export type SpaceCreationParams = { id: SpaceId, name: SpaceName, quantity: number, seats: number }

export class SpaceWasCreated extends StorableEvent {

    eventAggregate: string = 'space';
    eventVersion: number = 1;

    readonly id: string
    readonly name: string
    readonly quantity: number
    readonly seats: number

    constructor(params: SpaceCreationParams) {
        super();
        this.id = params.id.value;
        this.name = params.name.value;
        this.quantity = params.quantity;
        this.seats = params.seats;
    }
}
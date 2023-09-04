import { AggregateRoot } from '@aulasoftwarelibre/nestjs-eventstore';

import { WorkspaceId } from '../../../workspace/domain/model/value-objects';
import { SpaceWasCreatedEvent } from '../event';
import { SpaceAmenityNotValidError } from '../exception';
import { SpaceId, SpaceName, SpaceQuantity, SpaceSeats } from './value-objects';
import { SpaceAmenity } from './value-objects/space-amenitys';
import { SpaceNameWasUpdatedEvent } from '../event/space-name-was-updated';
import { SpaceQuantityWasUpdatedEvent } from '../event/space-quantity-was-updated';
import { SpaceSeatsWasUpdatedEvent } from '../event/space-seats-was-updated';
import { SpaceWasDeletedEvent } from '../event/space-was-deleted';

export class Space extends AggregateRoot {
  private _id!: SpaceId;
  private _workspaceId!: WorkspaceId;
  private _name!: SpaceName;
  private _quantity!: SpaceQuantity;
  private _seats!: SpaceSeats;
  private _amenitys!: Array<SpaceAmenity>;
  private _image!: string;
  private _deleted!: boolean | null;

  public static add(
    id: SpaceId,
    workspaceId: WorkspaceId,
    name: SpaceName,
    quantity: SpaceQuantity,
    seats: SpaceSeats,
    amenitys: Array<SpaceAmenity>,
    image: string
  ): Space {
    const space = new Space();

    const event = new SpaceWasCreatedEvent(
      id.value,
      workspaceId.value,
      name.value,
      quantity.value,
      seats.value,
      amenitys.map((amenity) => amenity.value),
      image
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
    this._image = event.image

    SpaceAmenity.fromStringList(event.amenitys).match(
      (amenitys) => {
        this._amenitys = amenitys;
      },
      (_) => {
        throw new SpaceAmenityNotValidError();
      },
    );

    this._deleted = null;
  }

  updateName(name: SpaceName): void {
    this._name.equals(name) == false &&
      this.apply(new SpaceNameWasUpdatedEvent(this._id.value, name.value));
  }

  private onSpaceNameWasUpdatedEvent(event: SpaceNameWasUpdatedEvent) {
    this._name = SpaceName.fromString(event.name);
  }

  updateQuantity(quantity: SpaceQuantity): void {
    this._quantity.equals(quantity) === false &&
      this.apply(
        new SpaceQuantityWasUpdatedEvent(this._id.value, quantity.value),
      );
  }

  private onSpaceQuantityWasUpdatedEvent(event: SpaceQuantityWasUpdatedEvent) {
    this._quantity = SpaceQuantity.fromNumber(event.quantity);
  }

  updateSeats(seats: SpaceSeats): void {
    this._seats.equals(seats) === false &&
      this.apply(new SpaceSeatsWasUpdatedEvent(this._id.value, seats.value));
  }

  private onSpaceSeatsWasUpdatedEvent(event: SpaceSeatsWasUpdatedEvent) {
    this._seats = SpaceSeats.fromNumber(event.seats);
  }

  delete(): void {
    if (this._deleted === true) return;
    this.apply(new SpaceWasDeletedEvent(this._id.value));
  }

  private onSpaceWasDeletedEvent(_: SpaceWasDeletedEvent) {
    this._deleted = true;
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

  public get amenitys(): Array<SpaceAmenity> {
    return this._amenitys;
  }

  public get deleted(): boolean {
    return this._deleted;
  }
}

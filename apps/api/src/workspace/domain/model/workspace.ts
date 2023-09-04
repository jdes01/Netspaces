import { AggregateRoot } from '@aulasoftwarelibre/nestjs-eventstore';

import { Space } from '../../../space/domain/model';
import {
  SpaceAmenity,
  SpaceId,
  SpaceName,
  SpaceQuantity,
  SpaceSeats,
} from '../../../space/domain/model/value-objects';
import { WorkspaceWasCreatedEvent, WorkspaceWasDeletedEvent } from '../event';
import { WorkspaceServiceNotValidError } from '../exception/workspace-service-not-valid-error';
import {
  WorkspaceDescription,
  WorkspaceId,
  WorkspaceLocation,
  WorkspaceName,
  WorkspaceService,
} from './value-objects/';
import { WorkspaceCompanyId } from './value-objects/workspace-company-id';
import { WorkspaceNameWasUpdatedEvent } from '../event/workspace-name-was-updated';
import { WorkspaceDescriptionWasUpdatedEvent } from '../event/workspace-description-was-updated';
import { WorkspaceLocationWasUpdatedEvent } from '../event/workspace-location-was-updated';

export class Workspace extends AggregateRoot {
  private _id!: WorkspaceId;
  private _companyId!: WorkspaceCompanyId;
  private _name!: WorkspaceName;
  private _description!: WorkspaceDescription;
  private _location!: WorkspaceLocation;
  private _services: Array<WorkspaceService> = [];
  private _images: Array<string> = [];
  private _deleted!: boolean;

  public static add(
    id: WorkspaceId,
    companyId: WorkspaceCompanyId,
    name: WorkspaceName,
    description: WorkspaceDescription,
    location: WorkspaceLocation,
    services: Array<WorkspaceService>,
    images: Array<string>
  ): Workspace {
    const workspace = new Workspace();

    const event = new WorkspaceWasCreatedEvent(
      id.value,
      companyId.value,
      name.value,
      description.value,
      location.street,
      location.city,
      location.country,
      services.map((service) => service.value),
      images,
    );

    workspace.apply(event);

    return workspace;
  }

  private onWorkspaceWasCreatedEvent(event: WorkspaceWasCreatedEvent): void {
    this._id = WorkspaceId.fromString(event.id);
    this._companyId = WorkspaceCompanyId.fromString(event.companyId);
    this._name = WorkspaceName.fromString(event.name);
    this._description = WorkspaceDescription.fromString(event.description);
    this._location = new WorkspaceLocation(
      event.street,
      event.city,
      event.country,
    );
    this._images = event.images

    const servicesResult = WorkspaceService.fromStringList(event.services);

    servicesResult.match(
      (services) => {
        this._services = services;
      },
      (_) => {
        throw new WorkspaceServiceNotValidError();
      },
    );

    this._deleted = false;
  }

  updateName(name: WorkspaceName) {
    this._name.equals(name) == false &&
      this.apply(new WorkspaceNameWasUpdatedEvent(this._id.value, name.value));
  }

  private onWorkspaceNameWasUpdatedEvent(event: WorkspaceNameWasUpdatedEvent) {
    this._name = WorkspaceName.fromString(event.name);
  }

  updateDescription(description: WorkspaceDescription) {
    this._description.equals(description) == false &&
      this.apply(
        new WorkspaceDescriptionWasUpdatedEvent(
          this._id.value,
          description.value,
        ),
      );
  }

  private onWorkspaceDescriptionWasUpdatedEvent(
    event: WorkspaceDescriptionWasUpdatedEvent,
  ) {
    this._description = WorkspaceDescription.fromString(event.description);
  }

  updateLocation(location: WorkspaceLocation) {
    this._location.equals(location) == false &&
      this.apply(
        new WorkspaceLocationWasUpdatedEvent(
          this._id.value,
          location.street,
          location.city,
          location.country,
        ),
      );
  }

  private onWorkspaceLocationWasUpdatedEvent(
    event: WorkspaceLocationWasUpdatedEvent,
  ) {
    this._location = new WorkspaceLocation(
      event.street,
      event.city,
      event.country,
    );
  }

  delete(): void {
    if (this._deleted === true) return;
    this.apply(new WorkspaceWasDeletedEvent(this._id.value));
  }

  private onWorkspaceWasDeletedEvent(_: WorkspaceWasDeletedEvent) {
    this._deleted = true;
  }

  public aggregateId(): string {
    return this._id.value;
  }

  public get id(): WorkspaceId {
    return this._id;
  }

  public get company(): WorkspaceCompanyId {
    return this._companyId;
  }

  public get deleted(): boolean {
    return this._deleted;
  }

  public get name(): WorkspaceName {
    return this._name;
  }

  public get description(): WorkspaceDescription {
    return this._description;
  }

  public get location(): WorkspaceLocation {
    return this._location;
  }

  public get services(): Array<WorkspaceService> {
    return this._services;
  }

  public addService(service: WorkspaceService) {
    this._services.push(service);
  }
}

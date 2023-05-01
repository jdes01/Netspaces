import { AggregateRoot } from '@aulasoftwarelibre/nestjs-eventstore';
import { Space } from 'apps/api/src/space/domain/model';
import {
	SpaceAmenity,
	SpaceId,
	SpaceName,
	SpaceQuantity,
	SpaceSeats,
} from 'apps/api/src/space/domain/model/value-objects';

import { WorkspaceWasCreatedEvent, WorkspaceWasDeleted } from '../event';
import {
	WorkspaceDescription,
	WorkspaceId,
	WorkspaceLocation,
	WorkspaceName,
	WorkspaceService,
} from './value-objects/';
import { WorkspaceServiceNotValidError } from '../exception/workspace-service-not-valid-error';

export class Workspace extends AggregateRoot {
	private _id!: WorkspaceId;
	private _name!: WorkspaceName;
	private _description!: WorkspaceDescription;
	private _location!: WorkspaceLocation;
	private _services: Array<WorkspaceService> = [];
	private _deleted!: boolean;

	public static add(
		id: WorkspaceId,
		name: WorkspaceName,
		description: WorkspaceDescription,
		location: WorkspaceLocation,
		services: Array<WorkspaceService>,
	): Workspace {
		const workspace = new Workspace();

		const event = new WorkspaceWasCreatedEvent(
			id.value,
			name.value,
			description.value,
			location.street,
			location.city,
			location.country,
			services.map((service) => service.value),
		);

		workspace.apply(event);

		return workspace;
	}

	public addSpace(
		spaceId: SpaceId,
		name: SpaceName,
		quantity: SpaceQuantity,
		seats: SpaceSeats,
		amenities: Array<SpaceAmenity>,
	): Space {
		return Space.add(spaceId, this.id, name, quantity, seats, amenities);
	}

	private onWorkspaceWasCreatedEvent(event: WorkspaceWasCreatedEvent): void {
		this._id = WorkspaceId.fromString(event.id);
		this._name = WorkspaceName.fromString(event.name);
		this._description = WorkspaceDescription.fromString(event.description);
		this._location = new WorkspaceLocation(event.street, event.city, event.country);

		const servicesResult = WorkspaceService.fromStringList(event.services).val
		if (servicesResult instanceof WorkspaceServiceNotValidError) { throw new WorkspaceServiceNotValidError() }
		this._services = servicesResult

		this._deleted = false;
	}

	private onWorkspacerWasDeletedEvent(_event: WorkspaceWasDeleted): void {
		this._deleted = true;
	}

	public aggregateId(): string {
		return this._id.value;
	}

	public get id(): WorkspaceId {
		return this._id;
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

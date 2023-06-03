import { AggregateRoot } from '@aulasoftwarelibre/nestjs-eventstore';

import { CompanyWasCreatedEvent } from '../event';
import { CompanyId, CompanyName } from './value-objects';

export class Company extends AggregateRoot {
	private _id!: CompanyId;
	private _name!: CompanyName;
	private _deleted!: boolean;

	public static add(id: CompanyId, name: CompanyName): Company {
		const company = new Company();

		const event = new CompanyWasCreatedEvent(id.value, name.value);

		company.apply(event);

		return company;
	}

	private onCompanyWasCreatedEvent(event: CompanyWasCreatedEvent): void {
		this._id = CompanyId.fromString(event.id);
		this._name = CompanyName.fromString(event.name);

		this._deleted = false;
	}

	public aggregateId(): string {
		return this._id.value;
	}

	public get id(): CompanyId {
		return this._id;
	}

	public get name(): CompanyName {
		return this._name;
	}
}

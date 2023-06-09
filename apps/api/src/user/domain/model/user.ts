import { AggregateRoot } from '@aulasoftwarelibre/nestjs-eventstore';

import { UserWasCreatedWithCompanyEvent, UserWasCreatedWithoutCompanyEvent, UserNameWasUpdatedEvent } from '../event';
import { UserId, UserName } from './value-objects/';
import { UserCompanyId } from './value-objects/user-company-id';
import { Nullable } from '@netspaces/domain';

export class User extends AggregateRoot {
	private _id!: UserId;
	private _name!: UserName;
	private _companyId?: Nullable<UserCompanyId>;
	private _deleted!: boolean;

	public static addWithoutCompany(id: UserId, name: UserName): User {
		const user = new User();
		const event = new UserWasCreatedWithoutCompanyEvent(id.value, name.value)
		user.apply(event);
		return user;
	}

	public static addWithCompany(id: UserId, name: UserName, companyId: UserCompanyId): User {
		const user = new User();
		const event = new UserWasCreatedWithCompanyEvent(id.value, name.value, companyId.value)
		user.apply(event);
		return user;
	}

	private onUserWasCreatedWithoutCompanyEvent(event: UserWasCreatedWithoutCompanyEvent): void {
		this._id = UserId.fromString(event.id);
		this._name = UserName.fromString(event.name);
		this._companyId = null;
		this._deleted = false;
	}

	private onUserWasCreatedWithCompanyEvent(event: UserWasCreatedWithCompanyEvent): void {
		this._id = UserId.fromString(event.id);
		this._name = UserName.fromString(event.name);
		this._companyId = UserCompanyId.fromString(event.companyId)
		this._deleted = false;
	}


	updateName(name: UserName): void {
		(this._name.equals(name) === false) && this.apply(new UserNameWasUpdatedEvent(this._id.value, name.value))
	}

	private onUserNameWasUpdatedEvent(event: UserNameWasUpdatedEvent) {
		this._name = UserName.fromString(event.name);
	}

	public aggregateId(): string {
		return this._id.value;
	}

	public get id(): UserId {
		return this._id;
	}

	public get name(): UserName {
		return this._name;
	}

	public get companyId(): Nullable<UserCompanyId> {
		return this._companyId;
	}
}

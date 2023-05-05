import { AggregateRoot } from '@aulasoftwarelibre/nestjs-eventstore';

import { UserWasCreatedEvent } from '../event';
import { UserId, UserName } from './value-objects/';

export class User extends AggregateRoot {
	private _id!: UserId;
	private _name!: UserName;
	private _deleted!: boolean;

	public static add(id: UserId, name: UserName): User {
		const user = new User();

		const event = new UserWasCreatedEvent(id.value, name.value);

		user.apply(event);

		return user;
	}

	private onUserWasCreatedEvent(event: UserWasCreatedEvent): void {
		this._id = UserId.fromString(event.id);
		this._name = UserName.fromString(event.name);

		this._deleted = false;
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
}

import { AggregateRoot } from '@aulasoftwarelibre/nestjs-eventstore';

import {
  UserWasCreatedWithCompanyEvent,
  UserWasCreatedWithoutCompanyEvent,
  UserNameWasUpdatedEvent,
  UserWasDeletedEvent,
} from '../event';
import { UserId, UserMail, UserName } from './value-objects/';
import { UserCompanyId } from './value-objects/user-company-id';
import { Nullable } from '@netspaces/domain';

export class User extends AggregateRoot {
  private _id!: UserId;
  private _name!: UserName;
  private _mail!: UserMail;
  private _companyId?: Nullable<UserCompanyId>;
  private _deleted!: boolean;

  public static addWithoutCompany(id: UserId, name: UserName, mail: UserMail): User {
    const user = new User();
    const event = new UserWasCreatedWithoutCompanyEvent(id.value, name.value, mail.value);
    user.apply(event);
    return user;
  }

  public static addWithCompany(
    id: UserId,
    name: UserName,
    companyId: UserCompanyId,
  ): User {
    const user = new User();
    const event = new UserWasCreatedWithCompanyEvent(
      id.value,
      name.value,
      companyId.value,
    );
    user.apply(event);
    return user;
  }

  private onUserWasCreatedWithoutCompanyEvent(
    event: UserWasCreatedWithoutCompanyEvent,
  ): void {
    this._id = UserId.fromString(event.id);
    this._name = UserName.fromString(event.name);
    this._mail = UserMail.fromString(event.mail);
    this._companyId = null;
    this._deleted = false;
  }

  private onUserWasCreatedWithCompanyEvent(
    event: UserWasCreatedWithCompanyEvent,
  ): void {
    this._id = UserId.fromString(event.id);
    this._name = UserName.fromString(event.name);
    this._companyId = UserCompanyId.fromString(event.companyId);
    this._deleted = false;
  }

  updateName(name: UserName): void {
    this._name.equals(name) === false &&
      this.apply(new UserNameWasUpdatedEvent(this._id.value, name.value));
  }

  private onUserNameWasUpdatedEvent(event: UserNameWasUpdatedEvent) {
    this._name = UserName.fromString(event.name);
  }

  delete(): void {
    if (this._deleted === true) return;
    this.apply(new UserWasDeletedEvent(this._id.value));
  }

  private onUserWasDeletedEvent(_: UserWasDeletedEvent) {
    this._deleted = true;
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

  public get mail(): UserMail {
    return this._mail;
  }

  public get companyId(): Nullable<UserCompanyId> {
    return this._companyId;
  }

  public get deleted(): boolean {
    return this._deleted;
  }
}

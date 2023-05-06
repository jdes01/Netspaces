import { UserId } from '../model/value-objects';
import { UserError } from './user-error';

export class UserAlreadyExistsError extends UserError {
	public static withId(id: UserId): UserAlreadyExistsError {
		return new UserAlreadyExistsError(`User with id ${id.value} already exists`);
	}
}

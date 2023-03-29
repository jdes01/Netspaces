import { SpaceId } from '../model/value-objects';
import { SpaceError } from './space-error';

export class SpaceAlreadyExistsError extends SpaceError {
	public static withId(id: SpaceId): SpaceAlreadyExistsError {
		return new SpaceAlreadyExistsError(`Space with id ${id.value} already exists`);
	}
}

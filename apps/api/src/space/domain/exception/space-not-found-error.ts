import { SpaceId } from '../model/value-objects';
import { SpaceError } from './space-error';

export class SpaceNotFoundError extends SpaceError {
  public static withId(id: SpaceId): SpaceNotFoundError {
    return new SpaceNotFoundError(`Space with id ${id.value} not found`);
  }
}

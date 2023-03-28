import { Nullable } from '@netspaces/domain';
import { Result } from 'ts-results';
import { SpaceError } from '../exception/space-error';
import { Space } from '../model';
import { SpaceId } from '../model/value-objects';

export interface SpaceRepository {
    find(spaceId: SpaceId): Promise<Result<Nullable<Space>, SpaceError>>;
    save(space: Space): Promise<Result<null, SpaceError>>;
}

export const SPACE_REPOSITORY = "SPACE_REPOSITORY"
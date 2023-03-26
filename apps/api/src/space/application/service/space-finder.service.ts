import { SpaceDTO } from '@netspaces/contracts';
import { SpaceId } from '../../domain/model/value-objects';

export const SPACE_FINDER = 'SPACE_FINDER';

export interface SpaceFinder {
    findAll(): Promise<Array<SpaceDTO>>;
    find(id: SpaceId): Promise<SpaceDTO>;
}
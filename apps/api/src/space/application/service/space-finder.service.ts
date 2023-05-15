import { SpaceDTO } from '@netspaces/contracts';
import { WorkspaceId } from 'apps/api/src/workspace/domain/model/value-objects';

import { SpaceId } from '../../domain/model/value-objects';

export const SPACE_FINDER = 'SPACE_FINDER';

export interface SpaceFinder {
	find(id: SpaceId): Promise<SpaceDTO | null>;
	findAll(): Promise<Array<SpaceDTO>>;
	findByWorkspaceId(id: WorkspaceId): Promise<Array<SpaceDTO>>;
}

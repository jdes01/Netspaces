import { SpaceWasCreatedProjection } from './space-was-created.projection';
import { SpaceNameWasUpdatedProjection } from './space-name-was-updated.projection';
import { SpaceQuantityWasUpdatedProjection } from './space-quantity-was-updated.projection';
import { SpaceSeatsWasUpdatedProjection } from './space-seats-was-updated.projection';
import { SpaceWasDeletedProjection } from './space-was-deleted.projection';

export * from './space.schema';

export const ProjectionHandlers = [SpaceWasCreatedProjection, SpaceNameWasUpdatedProjection, SpaceQuantityWasUpdatedProjection, SpaceSeatsWasUpdatedProjection, SpaceWasDeletedProjection];

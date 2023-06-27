import { WorkspaceNameWasUpdatedProjection } from './workspace-name-was-updated.projection';
import { WorkspaceWasCreatedProjection } from './workspace-was-created.projection';
import { WorkspaceDescriptionWasUpdatedProjection } from './workspace-description-was-updated.projection';
import { WorkspaceLocationWasUpdatedProjection } from './workspace-location-was-updated.projection';
import { WorkspaceWasDeletedProjection } from './workspace-was-deleted.projection';

export * from './workspace.schema';

export const ProjectionHandlers = [
  WorkspaceWasCreatedProjection,
  WorkspaceNameWasUpdatedProjection,
  WorkspaceDescriptionWasUpdatedProjection,
  WorkspaceLocationWasUpdatedProjection,
  WorkspaceWasDeletedProjection,
];

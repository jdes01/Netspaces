import { WorkspaceWasCreatedProjection } from './workspace-was-created.projection';

export * from './workspace.schema';

export const ProjectionHandlers = [
    WorkspaceWasCreatedProjection,
];
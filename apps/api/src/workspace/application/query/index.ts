import { GetWorkspaceByIdQuery } from './get-workspace-by-id.query';
import { GetWorkspacesQuery } from './get-workspaces.query';
import { GetWorkspacesByOwnerIdQuery } from './get-workspaces-by-owner-id.query';
import { GetWorkspaceByIdHandler } from './handler/get-workspace-by-id.handler';
import { GetWorkspacesHandler } from './handler/get-workspaces.handler';
import { GetWorkspacesByOwnerIdHandler } from './handler/get-workspaces-by-owner-id.handler';

export * from './get-workspaces.query';
export * from './handler/get-workspaces.handler';

export const QueryHandlers = [GetWorkspacesHandler, GetWorkspaceByIdHandler, GetWorkspacesByOwnerIdHandler];

export const Queries = [GetWorkspacesQuery, GetWorkspaceByIdQuery, GetWorkspacesByOwnerIdQuery];

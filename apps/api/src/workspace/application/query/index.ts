import { GetWorkspaceByIdQuery } from './get-workspace-by-id.query';
import { GetWorkspacesQuery } from './get-workspaces.query';
import { GetWorkspacesByCompanyIdQuery } from './get-workspaces-by-company-id.query';
import { GetWorkspaceByIdHandler } from './handler/get-workspace-by-id.handler';
import { GetWorkspacesHandler } from './handler/get-workspaces.handler';
import { GetWorkspacesByCompanyIdHandler } from './handler/get-workspaces-by-company-id.handler';

export * from './get-workspaces.query';
export * from './handler/get-workspaces.handler';

export const QueryHandlers = [
  GetWorkspacesHandler,
  GetWorkspaceByIdHandler,
  GetWorkspacesByCompanyIdHandler,
];

export const Queries = [
  GetWorkspacesQuery,
  GetWorkspaceByIdQuery,
  GetWorkspacesByCompanyIdQuery,
];

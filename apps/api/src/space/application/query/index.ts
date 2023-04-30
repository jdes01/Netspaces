import { GetSpaceByIdQuery } from './get-space-by-id.query';
import { GetSpacesByWorkspaceIdQuery } from './get-spaces-by-workspace-id.query';
import { GetSpacesQuery } from './get-spaces.query';
import { GetSpaceByIdHandler } from './handler/get-space-by-id.handler';
import { GetSpacesByWorkspaceIdHandler } from './handler/get-spaces-by-workspace-id.handler';
import { GetSpacesHandler } from './handler/get-spaces.handler';

export * from './get-spaces.query';

export const QueryHandlers = [GetSpacesHandler, GetSpaceByIdHandler, GetSpacesByWorkspaceIdHandler];

export const Query = [GetSpacesQuery, GetSpaceByIdQuery, GetSpacesByWorkspaceIdQuery];

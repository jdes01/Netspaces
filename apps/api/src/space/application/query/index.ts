import { GetSpaceByIdQuery } from './get-space-by-id.query';
import { GetSpacesQuery } from './get-spaces.query';
import { GetSpaceByIdHandler } from './handler/get-space-by-id.handler';
import { GetSpacesHandler } from './handler/get-spaces.handler';
export * from './get-spaces.query';

export const QueryHandlers = [GetSpacesHandler, GetSpaceByIdHandler];

export const Query = [GetSpacesQuery, GetSpaceByIdQuery];

import { GetUserByIdQuery } from './get-user-by-id.query';
import { GetUsersQuery } from './get-users.query';
import { GetUserByIdHandler } from './handler/get-user-by-id.handler';
import { GetUsersHandler } from './handler/get-users.handler';

export * from './get-users.query';
export * from './handler/get-users.handler';

export const QueryHandlers = [GetUsersHandler, GetUserByIdHandler];

export const Queries = [GetUsersQuery, GetUserByIdQuery];

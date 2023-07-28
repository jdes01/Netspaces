import { GetUserByIdQuery } from './get-user-by-id.query';
import { GetUserByMailQuery } from './get-user-by-mail.query';
import { GetUsersByCompanyIdQuery } from './get-users-by-company-id.query';
import { GetUsersQuery } from './get-users.query';
import { GetUserByIdHandler } from './handler/get-user-by-id.handler';
import { GetUserByMailHandler } from './handler/get-user-by-mail.handler';
import { GetUsersByCompanyIdHandler } from './handler/get-users-by-company-id.handler';
import { GetUsersHandler } from './handler/get-users.handler';

export * from './get-users.query';
export * from './handler/get-users.handler';

export const QueryHandlers = [
  GetUsersHandler,
  GetUserByIdHandler,
  GetUsersByCompanyIdHandler,
  GetUserByMailHandler
];

export const Queries = [
  GetUsersQuery,
  GetUserByIdQuery,
  GetUsersByCompanyIdQuery,
  GetUserByMailQuery
];

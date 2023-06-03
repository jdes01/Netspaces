import { GetCompanyByIdQuery } from './get-company-by-id.query';
import { GetCompanysQuery } from './get-companys.query';
import { GetCompanyByIdHandler } from './handler/get-company-by-id.handler';
import { GetCompanysHandler } from './handler/get-companys.handler';

export * from './get-companys.query';
export * from './handler/get-companys.handler';

export const QueryHandlers = [GetCompanysHandler, GetCompanyByIdHandler];

export const Queries = [GetCompanysQuery, GetCompanyByIdQuery];

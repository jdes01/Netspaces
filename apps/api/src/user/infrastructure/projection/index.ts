import { UserWasCreatedWithoutCompanyProjection } from './user-was-created-without-company.projection';
import { UserWasCreatedWithCompanyProjection } from './user-was-created-with-company.projection';

export * from './user.schema';

export const ProjectionHandlers = [UserWasCreatedWithoutCompanyProjection, UserWasCreatedWithCompanyProjection];

import { UserWasCreatedWithoutCompanyProjection } from './user-was-created-without-company.projection';
import { UserWasCreatedWithCompanyProjection } from './user-was-created-with-company.projection';
import { UserNameWasUpdatedProjection } from './user-name-was-updated.projection';
import { UserWasDeletedProjection } from './user-was-deleted.projection';

export * from './user.schema';

export const ProjectionHandlers = [UserWasCreatedWithoutCompanyProjection, UserWasCreatedWithCompanyProjection, UserNameWasUpdatedProjection, UserWasDeletedProjection];

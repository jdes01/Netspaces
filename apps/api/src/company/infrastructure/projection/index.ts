import { CompanyNameWasUpdatedProjection } from './company-name-was-updated.projection';
import { CompanyWasCreatedProjection } from './company-was-created.projection';

export * from './company.schema';

export const ProjectionHandlers = [CompanyWasCreatedProjection, CompanyNameWasUpdatedProjection];

import { CompanyNameWasUpdatedProjection } from './company-name-was-updated.projection';
import { CompanyWasCreatedProjection } from './company-was-created.projection';
import { CompanyWasDeletedProjection } from './company-was-deleted.projection';

export * from './company.schema';

export const ProjectionHandlers = [
  CompanyWasCreatedProjection,
  CompanyNameWasUpdatedProjection,
  CompanyWasDeletedProjection,
];

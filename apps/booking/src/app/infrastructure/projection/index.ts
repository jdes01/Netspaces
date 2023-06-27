import { BookingWasCreatedProjection } from './booking/booking-was-created.projection';
import { SpaceWasCreatedProjection } from './space/space-was-created.projection';
import { UserWasCreatedWithoutCompanyProjection } from './user/user-was-created-without-company.projection';
import { UserWasCreatedWithCompanyProjection } from './user/user-was-created-with-company.projection';
import { CompanyWasCreatedProjection } from './company/company-was-created.projection';
import { SpaceQuantityWasUpdatedProjection } from './space/space-quantity-was-updated.projection';
import { CompanyWasDeletedProjection } from './company/company-was-deleted.projection';
import { UserWasDeletedProjection } from './user/user-was-deleted.projection';
import { SpaceWasDeletedProjection } from './space/space-was-deleted.projection';
import { BookingWasDeletedProjection } from './booking/booking-was-deleted.projection';

export const SpaceProjections = [
  SpaceWasCreatedProjection,
  SpaceQuantityWasUpdatedProjection,
  SpaceWasDeletedProjection,
];
export const UserProjections = [
  UserWasCreatedWithoutCompanyProjection,
  UserWasCreatedWithCompanyProjection,
  UserWasDeletedProjection,
];
export const CompanyProjections = [
  CompanyWasCreatedProjection,
  CompanyWasDeletedProjection,
];
export const BookingProjections = [
  BookingWasCreatedProjection,
  BookingWasDeletedProjection,
];

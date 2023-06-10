import { BookingWasCreatedProjection } from './booking-was-created.projection';
import { SpaceWasCreatedProjection } from './space-was-created.projection';
import { UserWasCreatedWithoutCompanyProjection } from './user-was-created-without-company.projection';
import { UserWasCreatedWithCompanyProjection } from './user-was-created-with-company.projection';
import { CompanyWasCreatedProjection } from './company-was-created.projection';
import { SpaceQuantityWasUpdatedProjection } from './space-quantity-was-updated.projection';
import { CompanyWasDeletedProjection } from './company-was-deleted.projection';
import { UserWasDeletedProjection } from './user-was-deleted.projection';


export const SpaceProjections = [SpaceWasCreatedProjection, SpaceQuantityWasUpdatedProjection];
export const UserProjections = [UserWasCreatedWithoutCompanyProjection, UserWasCreatedWithCompanyProjection, UserWasDeletedProjection];
export const CompanyProjections = [CompanyWasCreatedProjection, CompanyWasDeletedProjection];
export const BookingProjections = [BookingWasCreatedProjection];

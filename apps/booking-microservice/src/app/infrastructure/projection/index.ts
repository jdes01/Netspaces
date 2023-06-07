import { BookingWasCreatedProjection } from './booking-was-created.projection';
import { SpaceWasCreatedProjection } from './space-was-created.projection';
import { UserWasCreatedWithoutCompanyProjection } from './user-was-created-without-company.projection';
import { UserWasCreatedWithCompanyProjection } from './user-was-created-with-company.projection';
import { CompanyWasCreatedProjection } from './company-was-created.projection';
import { SpaceQuantityWasUpdatedProjection } from './space-quantity-was-updated.projection';


export const SpaceProjections = [SpaceWasCreatedProjection, SpaceQuantityWasUpdatedProjection];
export const UserProjections = [UserWasCreatedWithoutCompanyProjection, UserWasCreatedWithCompanyProjection];
export const CompanyProjections = [CompanyWasCreatedProjection];
export const BookingProjections = [BookingWasCreatedProjection];

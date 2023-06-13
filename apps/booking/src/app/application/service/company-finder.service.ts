import { CompanyDTO } from '@netspaces/contracts';

import { BookingCompanyId } from '../../domain/model/value-objects';

export const COMPANY_FINDER = 'COMPANY_FINDER';

export interface CompanyFinder {
    find(id: BookingCompanyId): Promise<CompanyDTO | null>;
}

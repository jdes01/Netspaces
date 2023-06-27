import { CompanyDTO } from '@netspaces/contracts';

import { CompanyId } from '../../domain/model/value-objects';

export const COMPANY_FINDER = 'COMPANY_FINDER';

export interface CompanyFinder {
  find(id: CompanyId): Promise<CompanyDTO | null>;
  findAll(): Promise<Array<CompanyDTO>>;
}

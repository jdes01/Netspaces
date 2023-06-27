import { Inject } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { CompanyDTO } from '@netspaces/contracts';

import { CompanyId } from '../../../domain/model/value-objects';
import {
  COMPANY_FINDER,
  CompanyFinder,
} from '../../service/company-finder.service';
import { GetCompanyByIdQuery } from '../get-company-by-id.query';

@QueryHandler(GetCompanyByIdQuery)
export class GetCompanyByIdHandler implements IQueryHandler {
  constructor(
    @Inject(COMPANY_FINDER)
    private readonly companyFinder: CompanyFinder,
  ) {}

  async execute(query: GetCompanyByIdQuery): Promise<CompanyDTO | null> {
    return this.companyFinder.find(CompanyId.fromString(query.id));
  }
}

import { Inject } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { CompanyDTO } from '@netspaces/contracts';

import {
  COMPANY_FINDER,
  CompanyFinder,
} from '../../service/company-finder.service';
import { GetCompanysQuery } from '../get-companys.query';

@QueryHandler(GetCompanysQuery)
export class GetCompanysHandler implements IQueryHandler {
  constructor(
    @Inject(COMPANY_FINDER)
    private readonly companyFinder: CompanyFinder,
  ) {}

  async execute(_: GetCompanysQuery): Promise<Array<CompanyDTO>> {
    return this.companyFinder.findAll();
  }
}

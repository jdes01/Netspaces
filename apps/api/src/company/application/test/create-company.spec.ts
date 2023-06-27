import { Err, Ok } from 'neverthrow';

import { CreateCompanyCommand } from '../command/create-company.command';
import { CreateCompanyHandler } from '../command/handler/create-company.handler';
import {
  InmemoryRedisService,
  InMemoryCompanyRepository,
  InMemoryCompanyFinder,
} from '../../../test';
import { CompanyDTO } from '@netspaces/contracts';
import { CompanyAlreadyExistsError } from '../../domain/exception';
import { CompanyId } from '../../domain/model/value-objects';

describe('CreateCompanyHandler', () => {
  let id: string;
  let name: string;
  let existingCompany: CompanyDTO;
  let command: CreateCompanyCommand;
  let redisService: InmemoryRedisService;

  beforeEach(() => {
    id = 'e847261d-5539-49da-876d-bfc245e50974';
    name = 'company name';
    existingCompany = { _id: id, name: name };
    command = new CreateCompanyCommand(id, name);
    redisService = new InmemoryRedisService();
  });

  it('should creates a new company successfully', async () => {
    const companyFinder = new InMemoryCompanyFinder([]);
    const companyRepository = new InMemoryCompanyRepository([]);
    const handler = new CreateCompanyHandler(
      companyRepository,
      companyFinder,
      redisService,
    );

    const result = await handler.execute(command);

    expect(result).toBeInstanceOf(Ok);
    expect(companyRepository.companys.length).toBe(1);
  });

  it('should return error with existing company', async () => {
    const companyFinder = new InMemoryCompanyFinder([existingCompany]);
    const companyRepository = new InMemoryCompanyRepository([]);
    const handler = new CreateCompanyHandler(
      companyRepository,
      companyFinder,
      redisService,
    );

    const result = await handler.execute(command);

    expect(result).toEqual(
      new Err(CompanyAlreadyExistsError.withId(CompanyId.fromString(id))),
    );
  });
});

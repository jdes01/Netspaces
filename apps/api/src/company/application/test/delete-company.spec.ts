import { Ok } from 'neverthrow';

import { UpdateCompanyCommand } from '../command/update-company.command'
import { DeleteCompanyHandler } from '../command/handler/delete-company.handler'
import { InmemoryRedisService, InMemoryCompanyRepository, InMemoryCompanyFinder } from '../../../test';
import { Company } from '../../domain/model';
import { CompanyId, CompanyName } from '../../domain/model/value-objects';
import { DeleteCompanyCommand } from '../command/delete-company.command';


describe('DeleteCompanyHandler', () => {

    let id: string
    let existingCompany: Company
    let command: DeleteCompanyCommand
    let redisService: InmemoryRedisService

    beforeEach(() => {
        id = 'e847261d-5539-49da-876d-bfc245e50974';
        existingCompany = Company.add(CompanyId.fromString(id), CompanyName.fromString("name"))
        command = new DeleteCompanyCommand(id);
        redisService = new InmemoryRedisService();
    });

    it('should delete an existing company successfully', async () => {

        const companyRepository = new InMemoryCompanyRepository([existingCompany]);
        const handler = new DeleteCompanyHandler(companyRepository);

        const result = await handler.execute(command);

        expect(result).toBeInstanceOf(Ok)
        expect(companyRepository.companys[0].deleted).toBe(true)
    });

});

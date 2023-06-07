import { Ok } from 'neverthrow';

import { UpdateCompanyCommand } from '../command/update-company.command'
import { UpdateCompanyHandler } from '../command/handler/update-company.handler'
import { InmemoryRedisService, InMemoryCompanyRepository, InMemoryCompanyFinder } from '../../../test';
import { Company } from '../../domain/model';
import { CompanyId, CompanyName } from '../../domain/model/value-objects';


describe('CreateCompanyHandler', () => {

    let id: string
    let name: string
    let existingCompany: Company
    let command: UpdateCompanyCommand
    let redisService: InmemoryRedisService

    beforeEach(() => {
        id = 'e847261d-5539-49da-876d-bfc245e50974';
        existingCompany = Company.add(CompanyId.fromString(id), CompanyName.fromString("previous name"))
        command = new UpdateCompanyCommand(id, "new name");
        redisService = new InmemoryRedisService();
    });

    it('should update an existing company successfully', async () => {

        const companyFinder = new InMemoryCompanyFinder([])
        const companyRepository = new InMemoryCompanyRepository([existingCompany]);
        const handler = new UpdateCompanyHandler(companyRepository);

        const result = await handler.execute(command);

        expect(result).toBeInstanceOf(Ok)
        expect(companyRepository.companys.length).toBe(1)
        expect(companyRepository.companys[0].name.value).toBe("new name")
    });

});

import { InjectAggregateRepository } from '@aulasoftwarelibre/nestjs-eventstore';
import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Err, Ok, Result } from 'neverthrow';

import { UpdateCompanyCommand } from '../update-company.command';
import { COMPANY_FINDER, CompanyFinder } from '../../service/company-finder.service';
import { CompanyError, CompanyNotFoundError } from '../../../domain/exception';
import { Company } from '../../../domain/model';
import { CompanyId, CompanyName } from '../../../domain/model/value-objects';
import { CompanyRepository } from '../../../domain/service/repository.service';

@CommandHandler(UpdateCompanyCommand)
export class UpdateCompanyHandler implements ICommandHandler<UpdateCompanyCommand> {
    constructor(
        @InjectAggregateRepository(Company)
        private readonly companyRepository: CompanyRepository<Company, CompanyId>,
        @Inject(COMPANY_FINDER)
        private readonly companyFinder: CompanyFinder
    ) { }

    async execute(command: UpdateCompanyCommand): Promise<Result<null, CompanyError>> {
        const id = CompanyId.fromString(command.id);

        const company = await this.companyRepository.find(id)

        if (company === null) {
            return new Err(CompanyNotFoundError.withId(id));
        }

        company.update(CompanyName.fromString(command.name))

        this.companyRepository.save(company);

        return new Ok(null);
    }
}

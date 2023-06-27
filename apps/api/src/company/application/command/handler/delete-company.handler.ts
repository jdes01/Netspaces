import { InjectAggregateRepository } from '@aulasoftwarelibre/nestjs-eventstore';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Err, Ok, Result } from 'neverthrow';

import { DeleteCompanyCommand } from '../delete-company.command';
import { CompanyError, CompanyNotFoundError } from '../../../domain/exception';
import { Company } from '../../../domain/model';
import { CompanyId } from '../../../domain/model/value-objects';
import { CompanyRepository } from '../../../domain/service/repository.service';

@CommandHandler(DeleteCompanyCommand)
export class DeleteCompanyHandler
  implements ICommandHandler<DeleteCompanyCommand>
{
  constructor(
    @InjectAggregateRepository(Company)
    private readonly companyRepository: CompanyRepository<Company, CompanyId>,
  ) {}

  async execute(
    command: DeleteCompanyCommand,
  ): Promise<Result<null, CompanyError>> {
    const id = CompanyId.fromString(command.id);
    const company = await this.companyRepository.find(id);

    if (company === null) {
      return new Err(CompanyNotFoundError.withId(id));
    }

    company.delete();
    this.companyRepository.save(company);

    return new Ok(null);
  }
}

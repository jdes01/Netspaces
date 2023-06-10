import { AggregateRepository, InjectAggregateRepository } from '@aulasoftwarelibre/nestjs-eventstore';
import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Err, Ok, Result } from 'neverthrow';

import { REDIS_SERVICE } from '../../../../redis.module';
import { CreateCompanyCommand } from '../../../application/command/create-company.command';
import { COMPANY_FINDER, CompanyFinder } from '../../service/company-finder.service';
import { CompanyAlreadyExistsError, CompanyError } from '../../../domain/exception';
import { Company } from '../../../domain/model';
import { CompanyId, CompanyName } from '../../../domain/model/value-objects';
import { CompanyRepository } from '../../../domain/service/repository.service';
import { RedisService } from '../../../domain/service/redis.service';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';

import { Logger } from 'winston';


@CommandHandler(CreateCompanyCommand)
export class CreateCompanyHandler implements ICommandHandler<CreateCompanyCommand> {
	constructor(
		@InjectAggregateRepository(Company)
		private readonly companyRepository: CompanyRepository<Company, CompanyId>,
		@Inject(COMPANY_FINDER)
		private readonly companyFinder: CompanyFinder,
		@Inject(REDIS_SERVICE)
		private readonly redisService: RedisService,
		@Inject(WINSTON_MODULE_PROVIDER)
		private readonly logger: Logger
	) { }

	async execute(command: CreateCompanyCommand): Promise<Result<null, CompanyError>> {
		this.logger.log("warn", "Creating Company")
		const id = CompanyId.fromString(command.id);

		if (await this.companyFinder.find(id)) {
			return new Err(CompanyAlreadyExistsError.withId(id));
		}

		const name = CompanyName.fromString(command.name);

		const company = Company.add(id, name);

		this.companyRepository.save(company);

		return new Ok(null);
	}
}

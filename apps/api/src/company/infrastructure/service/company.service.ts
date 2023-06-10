import { Injectable } from '@nestjs/common';
import { CommandBus, ICommand, IQuery, QueryBus } from '@nestjs/cqrs';
import { CompanyDTO } from '@netspaces/contracts';
import { Result } from 'neverthrow';

import { CreateCompanyCommand } from '../../application/command/create-company.command';
import { GetCompanysQuery } from '../../application/query';
import { GetCompanyByIdQuery } from '../../application/query/get-company-by-id.query';
import { CompanyError } from '../../domain/exception';
import { UpdateCompanyCommand } from '../../application/command/update-company.command';
import { DeleteCompanyCommand } from '../../application/command/delete-company.command';

@Injectable()
export class CompanyService {
	constructor(private readonly commandBus: CommandBus, private readonly queryBus: QueryBus) { }

	async createCompany(id: string, name: string): Promise<Result<null, CompanyError>> {
		return this.commandBus.execute<ICommand, Result<null, CompanyError>>(new CreateCompanyCommand(id, name));
	}

	async updateCompany(id: string, name: string): Promise<Result<null, CompanyError>> {
		return this.commandBus.execute<ICommand, Result<null, CompanyError>>(new UpdateCompanyCommand(id, name));
	}

	async getCompanys() {
		return this.queryBus.execute<IQuery, Array<CompanyDTO>>(new GetCompanysQuery());
	}

	async getCompanyById(id: string) {
		return this.queryBus.execute<IQuery, CompanyDTO>(new GetCompanyByIdQuery(id));
	}

	async deleteCompany(id: string): Promise<Result<null, CompanyError>> {
		return this.commandBus.execute<ICommand, Result<null, CompanyError>>(new DeleteCompanyCommand(id));
	}
}

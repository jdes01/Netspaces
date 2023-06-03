import { Injectable } from '@nestjs/common';
import { CommandBus, ICommand, IQuery, QueryBus } from '@nestjs/cqrs';
import { UserDTO } from '@netspaces/contracts';
import { Result } from 'neverthrow';

import { CreateUserWithoutCompanyCommand } from '../../application/command/create-user-without-company.command';
import { GetUsersQuery } from '../../application/query';
import { GetUserByIdQuery } from '../../application/query/get-user-by-id.query';
import { GetUsersByCompanyIdQuery } from '../../application/query/get-users-by-company-id.query';
import { UserError } from '../../domain/exception';
import { CreateUserWithCompanyCommand } from '../../application/command/create-user-with-company.command';

@Injectable()
export class UserService {
	constructor(private readonly commandBus: CommandBus, private readonly queryBus: QueryBus) { }

	async createUserWithoutCompany(id: string, name: string): Promise<Result<null, UserError>> {
		return this.commandBus.execute<ICommand, Result<null, UserError>>(new CreateUserWithoutCompanyCommand(id, name));
	}

	async createUserWithCompany(id: string, name: string, companyId: string): Promise<Result<null, UserError>> {
		return this.commandBus.execute<ICommand, Result<null, UserError>>(new CreateUserWithCompanyCommand(id, name, companyId));
	}

	async getUsers() {
		return this.queryBus.execute<IQuery, Array<UserDTO>>(new GetUsersQuery());
	}

	async getUserById(id: string) {
		return this.queryBus.execute<IQuery, UserDTO>(new GetUserByIdQuery(id));
	}

	async getUsersByCompanyId(id: string) {
		return this.queryBus.execute<IQuery, Array<UserDTO>>(new GetUsersByCompanyIdQuery(id));
	}
}

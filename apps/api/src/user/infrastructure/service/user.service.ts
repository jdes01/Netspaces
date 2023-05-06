import { Injectable } from '@nestjs/common';
import { CommandBus, ICommand, IQuery, QueryBus } from '@nestjs/cqrs';
import { UserDTO } from '@netspaces/contracts';
import { Result } from 'neverthrow';

import { CreateUserCommand } from '../../application/command/create-user.command';
import { GetUsersQuery } from '../../application/query';
import { GetUserByIdQuery } from '../../application/query/get-user-by-id.query';
import { UserError } from '../../domain/exception';

@Injectable()
export class UserService {
    constructor(private readonly commandBus: CommandBus, private readonly queryBus: QueryBus) { }

    async createUser(
        id: string,
        name: string,
    ): Promise<Result<null, UserError>> {

        return this.commandBus.execute<ICommand, Result<null, UserError>>(
            new CreateUserCommand(id, name),
        );
    }

    async getUsers() {
        return this.queryBus.execute<IQuery, Array<UserDTO>>(new GetUsersQuery());
    }

    async getUserById(id: string) {
        return this.queryBus.execute<IQuery, UserDTO>(new GetUserByIdQuery(id));
    }
}

import { Inject } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { UserDTO } from '@netspaces/contracts';

import { USER_FINDER, UserFinder } from '../../service/user-finder.service';
import { GetUsersQuery } from '../get-users.query';

@QueryHandler(GetUsersQuery)
export class GetUsersHandler implements IQueryHandler {
  constructor(
    @Inject(USER_FINDER)
    private readonly userFinder: UserFinder,
  ) {}

  async execute(_: GetUsersQuery): Promise<Array<UserDTO>> {
    return this.userFinder.findAll();
  }
}

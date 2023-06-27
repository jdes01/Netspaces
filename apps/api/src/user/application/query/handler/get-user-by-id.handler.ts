import { Inject } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { UserDTO } from '@netspaces/contracts';

import { UserId } from '../../../domain/model/value-objects';
import { USER_FINDER, UserFinder } from '../../service/user-finder.service';
import { GetUserByIdQuery } from '../get-user-by-id.query';

@QueryHandler(GetUserByIdQuery)
export class GetUserByIdHandler implements IQueryHandler {
  constructor(
    @Inject(USER_FINDER)
    private readonly userFinder: UserFinder,
  ) {}

  async execute(query: GetUserByIdQuery): Promise<UserDTO | null> {
    return this.userFinder.find(UserId.fromString(query.id));
  }
}

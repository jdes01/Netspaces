import { Inject } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { UserDTO } from '@netspaces/contracts';

import { USER_FINDER, UserFinder } from '../../service/user-finder.service';
import { GetUsersByCompanyIdQuery } from '../get-users-by-company-id.query';
import { UserCompanyId } from '../../../domain/model/value-objects/user-company-id';

@QueryHandler(GetUsersByCompanyIdQuery)
export class GetUsersByCompanyIdHandler implements IQueryHandler {
  constructor(
    @Inject(USER_FINDER)
    private readonly userFinder: UserFinder,
  ) {}

  async execute(query: GetUsersByCompanyIdQuery): Promise<Array<UserDTO>> {
    return this.userFinder.findByCompanyId(UserCompanyId.fromString(query.id));
  }
}

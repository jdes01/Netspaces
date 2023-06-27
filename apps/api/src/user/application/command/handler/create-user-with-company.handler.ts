import { InjectAggregateRepository } from '@aulasoftwarelibre/nestjs-eventstore';
import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Err, Ok, Result } from 'neverthrow';

import { REDIS_SERVICE } from '../../../../redis.module';
import { RedisService } from '../../../domain/service/redis.service';
import { CreateUserWithCompanyCommand } from '../../../application/command/create-user-with-company.command';
import {
  USER_FINDER,
  UserFinder,
} from '../../../application/service/user-finder.service';
import { UserAlreadyExistsError, UserError } from '../../../domain/exception';
import { User } from '../../../domain/model';
import { UserId, UserName } from '../../../domain/model/value-objects';
import {
  COMPANY_FINDER,
  CompanyFinder,
} from '../../../../company/application/service/company-finder.service';
import { CompanyId } from '../../../../company/domain/model/value-objects';
import { CompanyNotFoundError } from '../../../../company/domain/exception';
import { UserRepository } from '../../../domain/service/repository.service';

@CommandHandler(CreateUserWithCompanyCommand)
export class CreateUserWithCompanyHandler
  implements ICommandHandler<CreateUserWithCompanyCommand>
{
  constructor(
    @InjectAggregateRepository(User)
    private readonly userRepository: UserRepository<User, UserId>,
    @Inject(USER_FINDER)
    private readonly userFinder: UserFinder,
    @Inject(COMPANY_FINDER)
    private readonly companyFinder: CompanyFinder,
    @Inject(REDIS_SERVICE)
    private readonly redisService: RedisService,
  ) {}

  async execute(
    command: CreateUserWithCompanyCommand,
  ): Promise<Result<null, UserError>> {
    const id = UserId.fromString(command.id);

    if (await this.userFinder.find(id)) {
      return new Err(UserAlreadyExistsError.withId(id));
    }

    const companyId = CompanyId.fromString(command.companyId);

    if ((await this.companyFinder.find(companyId)) === null) {
      return new Err(CompanyNotFoundError.withId(companyId));
    }

    const name = UserName.fromString(command.name);

    const user = User.addWithCompany(id, name, companyId);

    this.userRepository.save(user);

    return new Ok(null);
  }
}

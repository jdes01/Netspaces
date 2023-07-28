import {
  AggregateRepository,
  InjectAggregateRepository,
} from '@aulasoftwarelibre/nestjs-eventstore';
import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Err, Ok, Result } from 'neverthrow';

import { REDIS_SERVICE } from '../../../../redis.module';
import { CreateUserWithoutCompanyCommand } from '../create-user-without-company.command';
import { USER_FINDER, UserFinder } from '../../service/user-finder.service';
import { UserAlreadyExistsError, UserError } from '../../../domain/exception';
import { User } from '../../../domain/model';
import { UserId, UserMail, UserName } from '../../../domain/model/value-objects';
import { UserRepository } from '../../../domain/service/repository.service';
import { RedisService } from 'apps/api/src/company/domain/service/redis.service';

@CommandHandler(CreateUserWithoutCompanyCommand)
export class CreateUserWithoutCompanyHandler
  implements ICommandHandler<CreateUserWithoutCompanyCommand>
{
  constructor(
    @InjectAggregateRepository(User)
    private readonly userRepository: UserRepository<User, UserId>,
    @Inject(USER_FINDER)
    private readonly userFinder: UserFinder,
    @Inject(REDIS_SERVICE)
    private readonly redisService: RedisService,
  ) { }

  async execute(
    command: CreateUserWithoutCompanyCommand,
  ): Promise<Result<null, UserError>> {
    const id = UserId.fromString(command.id);

    if (await this.userFinder.find(id)) {
      return new Err(UserAlreadyExistsError.withId(id));
    }

    const mail = UserMail.fromString(command.mail);

    if (await this.userFinder.findByMail(mail)) {
      return new Err(UserAlreadyExistsError.withId(mail));
    }

    const name = UserName.fromString(command.name);

    const user = User.addWithoutCompany(id, name, mail);

    this.userRepository.save(user);

    return new Ok(null);
  }
}

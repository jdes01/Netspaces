import { AggregateRepository, InjectAggregateRepository } from '@aulasoftwarelibre/nestjs-eventstore';
import { Inject, Logger } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Err, Ok, Result } from 'neverthrow';

import { REDIS_SERVICE, RedisService } from '../../../../redis.module';
import { CreateUserWithCompanyCommand } from '../../../application/command/create-user-with-company.command';
import { USER_FINDER, UserFinder } from '../../../application/service/user-finder.service';
import { UserAlreadyExistsError, UserError } from '../../../domain/exception';
import { User } from '../../../domain/model';
import { UserId, UserName } from '../../../domain/model/value-objects';
import { COMPANY_FINDER, CompanyFinder } from 'apps/api/src/company/application/service/company-finder.service';
import { CompanyId } from 'apps/api/src/company/domain/model/value-objects';
import { CompanyNotFoundError } from 'apps/api/src/company/domain/exception';

@CommandHandler(CreateUserWithCompanyCommand)
export class CreateUserWithCompanyHandler implements ICommandHandler<CreateUserWithCompanyCommand> {
    constructor(
        @InjectAggregateRepository(User)
        private readonly userRepository: AggregateRepository<User, UserId>,
        @Inject(USER_FINDER)
        private readonly userFinder: UserFinder,
        @Inject(COMPANY_FINDER)
        private readonly companyFinder: CompanyFinder,
        @Inject(REDIS_SERVICE)
        private readonly redisService: RedisService,
    ) { }

    async execute(command: CreateUserWithCompanyCommand): Promise<Result<null, UserError>> {
        const id = UserId.fromString(command.id);

        if (await this.userFinder.find(id)) {
            return new Err(UserAlreadyExistsError.withId(id));
        }

        const companyId = CompanyId.fromString(command.companyId);

        if (await this.companyFinder.find(companyId) === null) {
            return new Err(CompanyNotFoundError.withId(id));
        }

        const name = UserName.fromString(command.name);

        const user = User.addWithCompany(id, name, companyId);

        this.userRepository.save(user);

        return new Ok(null);
    }
}

import { AggregateRepository, InjectAggregateRepository } from '@aulasoftwarelibre/nestjs-eventstore';
import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Err, Ok, Result } from 'neverthrow';

import { REDIS_SERVICE, RedisService } from '../../../../redis.module';
import { CreateUserCommand } from '../../../application/command/create-user.command';
import { USER_FINDER, UserFinder } from '../../../application/service/user-finder.service';
import { UserAlreadyExistsError, UserError } from '../../../domain/exception';
import { User } from '../../../domain/model';
import { UserId, UserName } from '../../../domain/model/value-objects';

@CommandHandler(CreateUserCommand)
export class CreateUserHandler implements ICommandHandler<CreateUserCommand> {
	constructor(
		@InjectAggregateRepository(User)
		private readonly userRepository: AggregateRepository<User, UserId>,
		@Inject(USER_FINDER)
		private readonly userFinder: UserFinder,
		@Inject(REDIS_SERVICE)
		private readonly redisService: RedisService,
	) {}

	async execute(command: CreateUserCommand): Promise<Result<null, UserError>> {
		const id = UserId.fromString(command.id);

		if (await this.userFinder.find(id)) {
			return new Err(UserAlreadyExistsError.withId(id));
		}

		const name = UserName.fromString(command.name);

		const user = User.add(id, name);

		this.userRepository.save(user);

		return new Ok(null);
	}
}

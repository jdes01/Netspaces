import { InjectAggregateRepository } from '@aulasoftwarelibre/nestjs-eventstore';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Err, Ok, Result } from 'neverthrow';

import { DeleteUserCommand } from '../delete-user.command';
import { UserError, UserNotFoundError } from '../../../domain/exception';
import { User } from '../../../domain/model';
import { UserId } from '../../../domain/model/value-objects';
import { UserRepository } from '../../../domain/service/repository.service';

@CommandHandler(DeleteUserCommand)
export class DeleteUserHandler implements ICommandHandler<DeleteUserCommand> {
  constructor(
    @InjectAggregateRepository(User)
    private readonly userRepository: UserRepository<User, UserId>,
  ) {}

  async execute(command: DeleteUserCommand): Promise<Result<null, UserError>> {
    const id = UserId.fromString(command.id);
    const user = await this.userRepository.find(id);

    if (user === null) {
      return new Err(UserNotFoundError.withId(id));
    }

    user.delete();
    this.userRepository.save(user);

    return new Ok(null);
  }
}

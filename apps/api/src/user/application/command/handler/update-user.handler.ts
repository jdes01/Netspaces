import { InjectAggregateRepository } from '@aulasoftwarelibre/nestjs-eventstore';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Err, Ok, Result } from 'neverthrow';

import { UserAlreadyExistsError, UserError } from '../../../domain/exception';
import { User } from '../../../domain/model';
import { UserId, UserName } from '../../../domain/model/value-objects';
import { UserRepository } from '../../../domain/service/repository.service';
import { UpdateUserCommand } from '../update-user.command';

@CommandHandler(UpdateUserCommand)
export class UpdateUserHandler implements ICommandHandler<UpdateUserCommand> {
    constructor(
        @InjectAggregateRepository(User)
        private readonly userRepository: UserRepository<User, UserId>,
    ) { }

    async execute(command: UpdateUserCommand): Promise<Result<null, UserError>> {
        const id = UserId.fromString(command.id);
        const user = await this.userRepository.find(id)

        if (user === null) return new Err(UserAlreadyExistsError.withId(id));

        user.updateName(UserName.fromString(command.name));
        this.userRepository.save(user);

        return new Ok(null);
    }
}

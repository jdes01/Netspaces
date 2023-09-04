import { Ok } from 'neverthrow';

import { DeleteUserHandler } from '../command/handler/delete-user.handler';
import { UserId, UserMail, UserName } from '../../domain/model/value-objects';
import { DeleteUserCommand } from '../command/delete-user.command';
import { InMemoryUserRepository, InmemoryRedisService } from '../../../test';
import { User } from '../../domain/model';

describe('DeleteUserHandler', () => {
  let id: string;
  let existingUser: User;
  let command: DeleteUserCommand;
  let redisService: InmemoryRedisService;

  beforeEach(() => {
    id = 'e847261d-5539-49da-876d-bfc245e50974';
    existingUser = User.addWithoutCompany(
      UserId.fromString(id),
      UserName.fromString('name'),
      UserMail.fromString("mail")
    );
    command = new DeleteUserCommand(id);
    redisService = new InmemoryRedisService();
  });

  it('should delete an existing user successfully', async () => {
    const userRepository = new InMemoryUserRepository([existingUser]);
    const handler = new DeleteUserHandler(userRepository);

    const result = await handler.execute(command);

    expect(result).toBeInstanceOf(Ok);
    expect(userRepository.users[0].deleted).toBe(true);
  });
});

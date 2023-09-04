import { Err, Ok } from 'neverthrow';
import {
  InmemoryRedisService,
  InMemoryUserFinder,
  InMemoryUserRepository,
} from '../../../test';
import { UserId } from '../../domain/model/value-objects';
import { CreateUserWithoutCompanyCommand } from '../command/create-user-without-company.command';
import { CreateUserWithoutCompanyHandler } from '../command/handler/create-user-without-company.handler';
import { UserDTO } from '@netspaces/contracts';
import { UserAlreadyExistsError } from '../../domain/exception';

describe('CreateUserHandler', () => {
  let id;
  let name;
  let mail;
  let existingUser: UserDTO;
  let command;
  let redisService;

  beforeEach(() => {
    id = 'e847261d-5539-49da-876d-bfc245e50974';
    name = 'userName';
    mail = "mail"
    existingUser = { _id: id, name: name, companyId: '', mail: mail };
    command = new CreateUserWithoutCompanyCommand(id, name, mail);
    redisService = new InmemoryRedisService();
  });

  it('should creates a new user successfully', async () => {
    const userRepository = new InMemoryUserRepository([]);
    const userFinder = new InMemoryUserFinder([]);
    const handler = new CreateUserWithoutCompanyHandler(
      userRepository,
      userFinder,
      redisService,
    );

    const result = await handler.execute(command);

    expect(result).toBeInstanceOf(Ok);
    expect(userRepository.users.length).toBe(1);
  });

  it('should return error with existing user', async () => {
    const userRepository = new InMemoryUserRepository([]);
    const userFinder = new InMemoryUserFinder([existingUser]);
    const handler = new CreateUserWithoutCompanyHandler(
      userRepository,
      userFinder,
      redisService,
    );

    const result = await handler.execute(command);

    expect(result).toEqual(
      new Err(UserAlreadyExistsError.withId(UserId.fromString(id))),
    );
  });
});

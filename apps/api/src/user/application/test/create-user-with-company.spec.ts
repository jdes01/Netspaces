import { Err, Ok } from 'neverthrow';
import {
  InmemoryRedisService,
  InMemoryUserFinder,
  InMemoryUserRepository,
  InMemoryCompanyFinder,
} from '../../../test';
import { UserId } from '../../domain/model/value-objects';
import { CreateUserWithCompanyCommand } from '../command/create-user-with-company.command';
import { CreateUserWithCompanyHandler } from '../command/handler/create-user-with-company.handler';
import { CompanyDTO, UserDTO } from '@netspaces/contracts';
import { UserAlreadyExistsError } from '../../domain/exception';
import { CompanyNotFoundError } from '../../../company/domain/exception';
import { CompanyId } from '../../../company/domain/model/value-objects';

describe('CreateUserWithCompanyHandler', () => {
  let id;
  let name;
  let mail;
  let companyId;
  let existingUser: UserDTO;
  let existingCompany: CompanyDTO;
  let command;
  let redisService;

  beforeEach(() => {
    id = 'e847261d-5539-49da-876d-bfc245e50974';
    name = 'userName';
    mail = "mail"
    companyId = 'f9906072-9b8b-4e29-b3fa-913bdfb32fde';

    existingUser = { _id: id, name: name, companyId: '', mail: mail };
    existingCompany = { _id: companyId, name: name };

    command = new CreateUserWithCompanyCommand(id, name, companyId);
    redisService = new InmemoryRedisService();
  });

  it('should creates a new user successfully', async () => {
    const userRepository = new InMemoryUserRepository([]);
    const userFinder = new InMemoryUserFinder([]);
    const companyFinder = new InMemoryCompanyFinder([existingCompany]);
    const handler = new CreateUserWithCompanyHandler(
      userRepository,
      userFinder,
      companyFinder,
      redisService,
    );

    const result = await handler.execute(command);

    expect(result).toBeInstanceOf(Ok);
    expect(userRepository.users.length).toBe(1);
  });

  it('should return error with existing user', async () => {
    const userRepository = new InMemoryUserRepository([]);
    const userFinder = new InMemoryUserFinder([existingUser]);
    const companyFinder = new InMemoryCompanyFinder([existingCompany]);
    const handler = new CreateUserWithCompanyHandler(
      userRepository,
      userFinder,
      companyFinder,
      redisService,
    );

    const result = await handler.execute(command);

    expect(result).toEqual(
      new Err(UserAlreadyExistsError.withId(UserId.fromString(id))),
    );
  });

  it('should return error without existing company', async () => {
    const userRepository = new InMemoryUserRepository([]);
    const userFinder = new InMemoryUserFinder([]);
    const companyFinder = new InMemoryCompanyFinder([]);
    const handler = new CreateUserWithCompanyHandler(
      userRepository,
      userFinder,
      companyFinder,
      redisService,
    );

    const result = await handler.execute(command);

    expect(result).toEqual(
      new Err(CompanyNotFoundError.withId(CompanyId.fromString(companyId))),
    );
  });
});

import { CreateUserWithCompanyCommand } from './create-user-with-company.command';
import { CreateUserWithoutCompanyCommand } from './create-user-without-company.command';
import { CreateUserWithCompanyHandler } from './handler/create-user-with-company.handler';
import { CreateUserWithoutCompanyHandler } from './handler/create-user-without-company.handler';
import { UpdateUserHandler } from './handler/update-user.handler';
import { UpdateUserCommand } from './update-user.command';

export const CommandHandlers = [CreateUserWithoutCompanyHandler, CreateUserWithCompanyHandler, UpdateUserHandler];

export const Command = [CreateUserWithoutCompanyCommand, CreateUserWithCompanyCommand, UpdateUserCommand];

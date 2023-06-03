import { CreateUserWithCompanyCommand } from './create-user-with-company.command';
import { CreateUserWithoutCompanyCommand } from './create-user-without-company.command';
import { CreateUserWithCompanyHandler } from './handler/create-user-with-company.handler';
import { CreateUserWithoutCompanyHandler } from './handler/create-user-without-company.handler';

export const CommandHandlers = [CreateUserWithoutCompanyHandler, CreateUserWithCompanyHandler];

export const Command = [CreateUserWithoutCompanyCommand, CreateUserWithCompanyCommand];

import { CreateUserCommand } from './create-user.command';
import { CreateUserHandler } from './handler/create-user.handler';

export const CommandHandlers = [CreateUserHandler];

export const Command = [CreateUserCommand];

import { CreateCompanyCommand } from './create-company.command';
import { CreateCompanyHandler } from './handler/create-company.handler';

export const CommandHandlers = [CreateCompanyHandler];

export const Command = [CreateCompanyCommand];

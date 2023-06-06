import { CreateCompanyCommand } from './create-company.command';
import { UpdateCompanyCommand } from './update-company.command';
import { CreateCompanyHandler } from './handler/create-company.handler';
import { UpdateCompanyHandler } from './handler/update-company.handler';

export const CommandHandlers = [CreateCompanyHandler, UpdateCompanyHandler];

export const Command = [CreateCompanyCommand, UpdateCompanyCommand];

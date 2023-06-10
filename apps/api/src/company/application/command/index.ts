import { CreateCompanyCommand } from './create-company.command';
import { UpdateCompanyCommand } from './update-company.command';
import { CreateCompanyHandler } from './handler/create-company.handler';
import { UpdateCompanyHandler } from './handler/update-company.handler';
import { DeleteCompanyCommand } from './delete-company.command';
import { DeleteCompanyHandler } from './handler/delete-company.handler';

export const CommandHandlers = [CreateCompanyHandler, UpdateCompanyHandler, DeleteCompanyHandler];

export const Command = [CreateCompanyCommand, UpdateCompanyCommand, DeleteCompanyCommand];

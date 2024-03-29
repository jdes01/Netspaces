import { ICommand } from '@nestjs/cqrs';

export class CreateUserWithCompanyCommand implements ICommand {
  constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly companyId: string,
  ) {}
}

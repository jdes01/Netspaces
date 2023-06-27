import { ICommand } from '@nestjs/cqrs';

export class CreateUserWithoutCompanyCommand implements ICommand {
  constructor(public readonly id: string, public readonly name: string) {}
}

import { ICommand } from '@nestjs/cqrs';

export class DeleteSpaceCommand implements ICommand {
  constructor(public readonly id: string) {}
}

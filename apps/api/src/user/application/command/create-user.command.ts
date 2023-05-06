import { ICommand } from '@nestjs/cqrs';

export class CreateUserCommand implements ICommand {
    constructor(
        public readonly id: string,
        public readonly name: string,
    ) { }
}

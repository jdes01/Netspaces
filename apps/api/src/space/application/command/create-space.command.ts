import { ICommand } from '@nestjs/cqrs';

export class CreateSpaceCommand implements ICommand {
    constructor(
        public readonly id: string,
        public readonly quantity: number,
    ) { }
}
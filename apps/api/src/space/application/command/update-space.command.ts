import { ICommand } from '@nestjs/cqrs';

export class UpdateSpaceCommand implements ICommand {
    constructor(
        public readonly id: string,
        public readonly name: string,
        public readonly quantity: number,
        public readonly seats: number,
    ) { }
}

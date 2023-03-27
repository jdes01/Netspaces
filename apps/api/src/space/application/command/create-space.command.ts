import { ICommand } from '@nestjs/cqrs';

export class CreateSpaceCommand implements ICommand {
    constructor(
        public readonly id: string,
        public readonly name: string,
        public readonly quantity: number,
        public readonly seats: number,
        public readonly amenities: Array<string>
    ) { }
}
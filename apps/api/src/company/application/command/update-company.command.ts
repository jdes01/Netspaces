import { ICommand } from '@nestjs/cqrs';

export class UpdateCompanyCommand implements ICommand {
    constructor(public readonly id: string, public readonly name: string) { }
}

import { ICommand } from '@nestjs/cqrs';

export class DeleteCompanyCommand implements ICommand {
    constructor(public readonly id: string) { }
}

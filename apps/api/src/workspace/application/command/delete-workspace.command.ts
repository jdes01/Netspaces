import { ICommand } from '@nestjs/cqrs';

export class DeleteWorkspaceCommand implements ICommand {
    constructor(
        public readonly id: string,
    ) { }
}

import { ICommand } from '@nestjs/cqrs';
import { LocationDTO } from '../../domain/model/value-objects';

export class CreateWorkspaceCommand implements ICommand {
    constructor(
        public readonly id: string,
        public readonly name: string,
        public readonly description: string,
        public readonly location: LocationDTO,
    ) { }
}
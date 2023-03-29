import { ICommand } from '@nestjs/cqrs';

export class CreateWorkspaceCommand implements ICommand {
	constructor(
		public readonly id: string,
		public readonly name: string,
		public readonly description: string,
		public readonly street: string,
		public readonly city: string,
		public readonly country: string,
		public readonly services: Array<string>,
	) {}
}

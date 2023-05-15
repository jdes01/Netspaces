import { ICommand } from '@nestjs/cqrs';

export class CreateBookingCommand implements ICommand {
	constructor(public readonly userId: string, public readonly spaceId: string, public readonly date: string) { }
}

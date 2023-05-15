import { ICommand } from '@nestjs/cqrs';
import { SerializedDate } from '@netspaces/domain';

export class CreateBookingCommand implements ICommand {
	constructor(
		public readonly userId: string,
		public readonly spaceId: string,
		public readonly serializedDate: SerializedDate,
	) {}
}

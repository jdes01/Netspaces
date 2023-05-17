import { IQuery } from '@nestjs/cqrs';

export class GetBookingsBySpaceQuery implements IQuery {
	constructor(public readonly spaceId: string) {}
}

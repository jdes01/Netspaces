import { IQuery } from '@nestjs/cqrs';

export class GetSpaceByIdQuery implements IQuery {
	constructor(public readonly id: string) {}
}

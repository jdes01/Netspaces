import { IQuery } from '@nestjs/cqrs';

export class GetWorkspaceByIdQuery implements IQuery {
	constructor(public readonly id: string) {}
}

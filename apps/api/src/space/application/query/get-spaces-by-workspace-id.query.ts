import { IQuery } from '@nestjs/cqrs';

export class GetSpacesByWorkspaceIdQuery implements IQuery {
	constructor(public readonly id: string) {}
}

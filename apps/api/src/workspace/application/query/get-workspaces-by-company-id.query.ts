import { IQuery } from '@nestjs/cqrs';

export class GetWorkspacesByCompanyIdQuery implements IQuery {
	constructor(public readonly id: string) { }
}

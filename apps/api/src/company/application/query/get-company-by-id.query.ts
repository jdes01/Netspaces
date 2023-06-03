import { IQuery } from '@nestjs/cqrs';

export class GetCompanyByIdQuery implements IQuery {
	constructor(public readonly id: string) { }
}

import { IQuery } from '@nestjs/cqrs';

export class GetUsersByCompanyIdQuery implements IQuery {
    constructor(public readonly id: string) { }
}

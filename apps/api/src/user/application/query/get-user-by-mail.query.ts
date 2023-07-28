import { IQuery } from '@nestjs/cqrs';

export class GetUserByMailQuery implements IQuery {
    constructor(public readonly mail: string) { }
}

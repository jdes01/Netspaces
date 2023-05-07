import { IQuery } from '@nestjs/cqrs';

export class GetWorkspacesByOwnerIdQuery implements IQuery {
    constructor(public readonly id: string) { }
}

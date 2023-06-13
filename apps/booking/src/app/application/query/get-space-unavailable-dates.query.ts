import { IQuery } from '@nestjs/cqrs';

export class GetSpaceUnavailableDatesQuery implements IQuery {
    constructor(public readonly spaceId: string) { }
}

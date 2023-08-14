import { IQuery } from '@nestjs/cqrs';

export class GetSpaceAvailabilityByMonthQuery implements IQuery {
    constructor(public readonly spaceId: string, public readonly month: number, public readonly year: number) { }
}

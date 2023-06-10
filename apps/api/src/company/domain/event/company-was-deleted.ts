import { Event } from '@aulasoftwarelibre/nestjs-eventstore';

export class CompanyWasDeletedEvent extends Event {
    constructor(public readonly id: string) {
        super(id, {
            _id: id,
        });
    }
}

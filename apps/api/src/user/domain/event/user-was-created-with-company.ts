import { Event } from '@aulasoftwarelibre/nestjs-eventstore';

export class UserWasCreatedWithCompanyEvent extends Event {
	constructor(public readonly id: string, public readonly name: string, public readonly companyId: string) {
		super(id, {
			_id: id,
			name: name,
			companyId: companyId
		});
	}
}

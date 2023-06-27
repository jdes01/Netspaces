import { Event } from '@aulasoftwarelibre/nestjs-eventstore';

export class UserNameWasUpdatedEvent extends Event {
  constructor(public readonly id: string, public readonly name: string) {
    super(id, {
      _id: id,
      name: name,
    });
  }
}

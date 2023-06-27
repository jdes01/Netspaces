import { Event } from '@aulasoftwarelibre/nestjs-eventstore';

export class WorkspaceDescriptionWasUpdatedEvent extends Event {
  constructor(public readonly id: string, public readonly description: string) {
    super(id, {
      _id: id,
      description,
    });
  }
}

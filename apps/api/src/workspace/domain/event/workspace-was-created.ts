import { Event } from '@aulasoftwarelibre/nestjs-eventstore';

export class WorkspaceWasCreatedEvent extends Event {
  constructor(
    public readonly id: string,
    public readonly companyId: string,
    public readonly name: string,
    public readonly description: string,
    public readonly street: string,
    public readonly city: string,
    public readonly country: string,
    public readonly services: Array<string>,
    public readonly images: Array<string>,
  ) {
    super(id, {
      _id: id,
      city,
      country,
      description,
      name,
      companyId,
      services,
      street,
      images
    });
  }
}

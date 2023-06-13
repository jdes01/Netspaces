import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

import { WorkspaceWasCreatedEvent } from '../../domain/event';
import { ElasticsearchService } from '@nestjs/elasticsearch';

@EventsHandler(WorkspaceWasCreatedEvent)
export class WorkspaceWasCreatedMessageProducer implements IEventHandler<WorkspaceWasCreatedEvent> {
    constructor(
        private readonly elasticsearchService: ElasticsearchService
    ) { }

    async handle(event: WorkspaceWasCreatedEvent) {
        this.elasticsearchService.index({
            index: 'workspaces',
            id: event.id,
            body: {
                name: event.name,
                description: event.description,
                street: event.street,
                city: event.city,
                country: event.country,
                spaces: []
            }
        })
    }
}

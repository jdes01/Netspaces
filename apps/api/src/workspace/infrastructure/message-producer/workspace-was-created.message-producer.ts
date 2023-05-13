import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { ClientKafka } from '@nestjs/microservices';
import { Inject, Logger } from '@nestjs/common';
import { WORKSPACE_WAS_CREATED_MESSAGE } from '@netspaces/contracts';
import { WorkspaceWasCreatedEvent } from '../../domain/event';


@EventsHandler(WorkspaceWasCreatedEvent)
export class WorkspaceWasCreatedMessageProducer implements IEventHandler<WorkspaceWasCreatedEvent> {
    constructor(
        @Inject('DATASERVICE')
        private readonly workSpaceProducerClient: ClientKafka
    ) { }

    async handle(event: WorkspaceWasCreatedEvent) {
        this.workSpaceProducerClient.emit(WORKSPACE_WAS_CREATED_MESSAGE, JSON.stringify(event.payload))
        Logger.log(`Workspace ${event.payload._id} was created message was sent`)
    }
}

import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { WorkspaceDescriptionWasUpdatedEvent } from '../../domain/event';
import { WORKSPACE_PROJECTION, WorkspaceDocument } from './workspace.schema';

@EventsHandler(WorkspaceDescriptionWasUpdatedEvent)
export class WorkspaceDescriptionWasUpdatedProjection
  implements IEventHandler<WorkspaceDescriptionWasUpdatedEvent>
{
  constructor(
    @InjectModel(WORKSPACE_PROJECTION)
    private readonly workspaceProjection: Model<WorkspaceDocument>,
  ) {}

  async handle(event: WorkspaceDescriptionWasUpdatedEvent) {
    this.workspaceProjection
      .findByIdAndUpdate(event.id, {
        description: event.description,
      })
      .exec();
  }
}

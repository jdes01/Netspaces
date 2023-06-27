import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { WorkspaceWasDeletedEvent } from '../../domain/event';
import { WORKSPACE_PROJECTION, WorkspaceDocument } from './workspace.schema';

@EventsHandler(WorkspaceWasDeletedEvent)
export class WorkspaceWasDeletedProjection
  implements IEventHandler<WorkspaceWasDeletedEvent>
{
  constructor(
    @InjectModel(WORKSPACE_PROJECTION)
    private readonly workspaceProjection: Model<WorkspaceDocument>,
  ) {}

  async handle(event: WorkspaceWasDeletedEvent) {
    const workspaceView = await this.workspaceProjection
      .findById(event.id)
      .exec();

    workspaceView.remove();
  }
}

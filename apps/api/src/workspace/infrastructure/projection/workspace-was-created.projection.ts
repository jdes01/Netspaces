import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { WorkspaceWasCreatedEvent } from '../../domain/event';
import { WorkspaceDocument, WORKSPACE_PROJECTION } from './workspace.schema';

@EventsHandler(WorkspaceWasCreatedEvent)
export class WorkspaceWasCreatedProjection
  implements IEventHandler<WorkspaceWasCreatedEvent>
{
  constructor(
    @InjectModel(WORKSPACE_PROJECTION)
    private readonly workspaceProjection: Model<WorkspaceDocument>
  ) { }

  async handle(event: WorkspaceWasCreatedEvent) {
    const workspace = new this.workspaceProjection({ ...event.payload });
    await workspace.save();
  }
}

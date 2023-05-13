import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { WORKSPACE_PROJECTION, WorkspaceDocument } from './schema/workspace.schema';
import { Controller, Logger } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';
import { WORKSPACE_WAS_CREATED_MESSAGE, WorkspaceWasCreatedMessage } from '@netspaces/contracts';

@Controller()
export class WorkspaceWasCreatedProjection {
    constructor(
        @InjectModel(WORKSPACE_PROJECTION)
        private readonly workspaceProjection: Model<WorkspaceDocument>,
    ) { }

    @EventPattern(WORKSPACE_WAS_CREATED_MESSAGE)
    async handle(message: WorkspaceWasCreatedMessage) {

        const workspace = new this.workspaceProjection({
            ...message,
        });
        await workspace.save();

        Logger.log(`Workspace ${message._id} stored`)
    }
}

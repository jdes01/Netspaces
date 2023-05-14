import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { WorkspaceDTO } from '@netspaces/contracts';
import { Model } from 'mongoose';

import { WorkspaceFinder } from '../../application/service/workspace-finder.service';
import { BookingWorkspaceId } from '../../domain/model/value-objects';
import { WORKSPACE_PROJECTION, WorkspaceDocument } from '../projection/schema/workspace.schema';

@Injectable()
export class MongoDBWorkspaceFinder implements WorkspaceFinder {
    constructor(
        @InjectModel(WORKSPACE_PROJECTION)
        private readonly workspaceProjection: Model<WorkspaceDocument>,
    ) { }

    find(id: BookingWorkspaceId): Promise<WorkspaceDTO | null> {
        return this.workspaceProjection.findById(id.value).exec();
    }

}

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { WorkspaceDTO } from '@netspaces/contracts';
import { Model } from 'mongoose';

import { WorkspaceId } from '../../domain/model/value-objects';
import { WorkspaceFinder } from '../../domain/service/workspace-finder.service';
import { WorkspaceDocument, WORKSPACE_PROJECTION } from '../projection';

@Injectable()
export class MongoDBWorkspaceFinder implements WorkspaceFinder {
    constructor(
        @InjectModel(WORKSPACE_PROJECTION) private readonly workspaceProjection: Model<WorkspaceDocument>,
    ) { }

    findAll(): Promise<WorkspaceDTO[]> {
        return this.workspaceProjection.find().exec();
    }

    find(id: WorkspaceId): Promise<WorkspaceDTO> {
        return this.workspaceProjection.findById(id.value).exec();
    }
}
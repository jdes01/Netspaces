import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { WorkspaceDTO } from '@netspaces/contracts';
import { Model } from 'mongoose';

import { IWorkspaceFinder } from '../../application/service/workspace-finder.service';
import { WorkspaceId } from '../../domain/model/value-objects';
import { WorkspaceDocument, WORKSPACE_PROJECTION } from '../projection';

@Injectable()
export class WorkspaceFinder implements IWorkspaceFinder {
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
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { WorkspaceDTO } from '@netspaces/contracts';
import { Model } from 'mongoose';

import { WorkspaceFinder } from '../../application/service/workspace-finder.service';
import { WorkspaceId } from '../../domain/model/value-objects';
import { WorkspaceOwnerId } from '../../domain/model/value-objects/workspace-owner-id';
import { WORKSPACE_PROJECTION, WorkspaceDocument } from '../projection';

@Injectable()
export class MongoDBWorkspaceFinder implements WorkspaceFinder {
	constructor(
		@InjectModel(WORKSPACE_PROJECTION)
		private readonly workspaceProjection: Model<WorkspaceDocument>,
	) {}

	findAll(): Promise<WorkspaceDTO[]> {
		return this.workspaceProjection.find().exec();
	}

	find(id: WorkspaceId): Promise<WorkspaceDTO | null> {
		return this.workspaceProjection.findById(id.value).exec();
	}

	findByOwnerId(id: WorkspaceOwnerId): Promise<WorkspaceDTO[]> {
		return this.workspaceProjection.find({ owner: id.value }).exec();
	}
}

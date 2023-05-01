import { Inject } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { WorkspaceDTO } from '@netspaces/contracts';

import { WorkspaceId } from '../../../domain/model/value-objects';
import { WORKSPACE_FINDER, WorkspaceFinder } from '../../service/workspace-finder.service';
import { GetWorkspaceByIdQuery } from '../get-workspace-by-id.query';

@QueryHandler(GetWorkspaceByIdQuery)
export class GetWorkspaceByIdHandler implements IQueryHandler {
	constructor(
		@Inject(WORKSPACE_FINDER)
		private readonly workspaceFinder: WorkspaceFinder,
	) { }

	async execute(query: GetWorkspaceByIdQuery): Promise<WorkspaceDTO | null> {
		return this.workspaceFinder.find(WorkspaceId.fromString(query.id));
	}
}

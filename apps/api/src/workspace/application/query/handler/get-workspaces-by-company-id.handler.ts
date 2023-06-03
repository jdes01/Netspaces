import { Inject } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { WorkspaceDTO } from '@netspaces/contracts';

import { WorkspaceCompanyId } from '../../../domain/model/value-objects/workspace-company-id';
import { WORKSPACE_FINDER, WorkspaceFinder } from '../../service/workspace-finder.service';
import { GetWorkspacesByCompanyIdQuery } from '../get-workspaces-by-company-id.query';

@QueryHandler(GetWorkspacesByCompanyIdQuery)
export class GetWorkspacesByCompanyIdHandler implements IQueryHandler {
	constructor(
		@Inject(WORKSPACE_FINDER)
		private readonly workspaceFinder: WorkspaceFinder,
	) { }

	async execute(query: GetWorkspacesByCompanyIdQuery): Promise<Array<WorkspaceDTO>> {
		return this.workspaceFinder.findByCompanyId(WorkspaceCompanyId.fromString(query.id));
	}
}

import { Injectable } from '@nestjs/common';
import { CommandBus, ICommand, IQuery, QueryBus } from '@nestjs/cqrs';
import { WorkspaceDTO } from '@netspaces/contracts';
import { Result } from 'ts-results';

import { CreateWorkspaceCommand } from '../../application/command/create-workspace.command';
import { GetWorkspacesQuery } from '../../application/query';
import { GetWorkspaceByIdQuery } from '../../application/query/get-workspace-by-id.query';
import { WorkspaceError } from '../../domain/exception';

@Injectable()
export class WorkspaceService {
	constructor(private readonly commandBus: CommandBus, private readonly queryBus: QueryBus) {}

	async createWorkspace(
		id: string,
		name: string,
		description: string,
		street: string,
		city: string,
		country: string,
		services: Array<string>,
	): Promise<Result<null, WorkspaceError>> {
		return this.commandBus.execute<ICommand, Result<null, WorkspaceError>>(
			new CreateWorkspaceCommand(id, name, description, street, city, country, services),
		);
	}

	async getWorkspaces() {
		return this.queryBus.execute<IQuery, Array<WorkspaceDTO>>(new GetWorkspacesQuery());
	}

	async getWorkspaceById(id: string) {
		return this.queryBus.execute<IQuery, WorkspaceDTO>(new GetWorkspaceByIdQuery(id));
	}
}

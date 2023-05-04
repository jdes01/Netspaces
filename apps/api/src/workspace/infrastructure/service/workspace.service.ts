import { Injectable } from '@nestjs/common';
import { CommandBus, ICommand, IQuery, QueryBus } from '@nestjs/cqrs';
import { WorkspaceDTO } from '@netspaces/contracts';
import { Result } from 'ts-results';

import { CreateWorkspaceCommand } from '../../application/command/create-workspace.command';
import { GetWorkspacesQuery } from '../../application/query';
import { GetWorkspaceByIdQuery } from '../../application/query/get-workspace-by-id.query';
import { WorkspaceError } from '../../domain/exception';

import { Redis } from 'ioredis'

@Injectable()
export class WorkspaceService {
	constructor(private readonly commandBus: CommandBus, private readonly queryBus: QueryBus) { }

	async createWorkspace(
		id: string,
		name: string,
		description: string,
		street: string,
		city: string,
		country: string,
		services: Array<string>,
	): Promise<Result<null, WorkspaceError>> {

		const redis = new Redis(
			{
				host: 'redis://netspaces-cache:6379',
				port: 6379,
				// password: 'eYVX7EwVmmxKPCDmwMtyKVge8oLd2t81',
			}
		)

		await redis.set(`workspace-${id}`, name)

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

import { Injectable } from '@nestjs/common';
import { CommandBus, ICommand, IQuery, QueryBus } from '@nestjs/cqrs';
import { SpaceDTO } from '@netspaces/contracts';
import { Result } from 'neverthrow';

import { CreateSpaceCommand } from '../../application/command/create-space.command';
import { GetSpacesQuery } from '../../application/query';
import { GetSpaceByIdQuery } from '../../application/query/get-space-by-id.query';
import { GetSpacesByWorkspaceIdQuery } from '../../application/query/get-spaces-by-workspace-id.query';
import { SpaceError } from '../../domain/exception';

@Injectable()
export class SpaceService {
	constructor(private readonly commandBus: CommandBus, private readonly queryBus: QueryBus) {}

	async createSpace(
		id: string,
		workspaceId: string,
		name: string,
		quantity: number,
		seats: number,
		amenities: Array<string>,
	): Promise<Result<null, SpaceError>> {
		return this.commandBus.execute<ICommand, Result<null, SpaceError>>(
			new CreateSpaceCommand(id, workspaceId, name, quantity, seats, amenities),
		);
	}

	async getSpaces(): Promise<Array<SpaceDTO>> {
		return this.queryBus.execute<IQuery, Array<SpaceDTO>>(new GetSpacesQuery());
	}

	async getSpaceById(id: string): Promise<SpaceDTO> {
		return this.queryBus.execute<IQuery, SpaceDTO>(new GetSpaceByIdQuery(id));
	}

	async getSpacesByWorkspaceId(id: string): Promise<Array<SpaceDTO>> {
		return this.queryBus.execute<IQuery, Array<SpaceDTO>>(new GetSpacesByWorkspaceIdQuery(id));
	}
}

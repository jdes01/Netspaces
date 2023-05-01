import { AggregateRepository, InjectAggregateRepository } from '@aulasoftwarelibre/nestjs-eventstore';
import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Err, Ok, Result } from 'ts-results';

import { WorkspaceAlreadyExistsError } from '../../../domain/exception';
import { WorkspaceError } from '../../../domain/exception/workspace-error';
import { Workspace } from '../../../domain/model';
import {
	WorkspaceDescription,
	WorkspaceId,
	WorkspaceLocation,
	WorkspaceName,
	WorkspaceService,
} from '../../../domain/model/value-objects';
import { CreateWorkspaceCommand } from '../../command/create-workspace.command';
import { WORKSPACE_FINDER, WorkspaceFinder } from '../../service/workspace-finder.service';

@CommandHandler(CreateWorkspaceCommand)
export class CreateWorkspaceHandler implements ICommandHandler<CreateWorkspaceCommand> {
	constructor(
		@InjectAggregateRepository(Workspace)
		private readonly workspaceRepository: AggregateRepository<Workspace, WorkspaceId>,
		@Inject(WORKSPACE_FINDER)
		private readonly workspaceFinder: WorkspaceFinder,
	) { }

	async execute(command: CreateWorkspaceCommand): Promise<Result<null, WorkspaceError>> {
		const id = WorkspaceId.fromString(command.id);

		if (await this.workspaceFinder.find(id)) {
			return Err(WorkspaceAlreadyExistsError.withId(id));
		}

		const name = WorkspaceName.fromString(command.name);
		const description = WorkspaceDescription.fromString(command.description);
		const location = new WorkspaceLocation(command.street, command.city, command.country);

		const result = WorkspaceService.fromStringList(command.services)

		if (result instanceof Err) {
			return result
		}

		const workspace = Workspace.add(id, name, description, location, result.val);

		this.workspaceRepository.save(workspace);

		return Ok(null);
	}
}

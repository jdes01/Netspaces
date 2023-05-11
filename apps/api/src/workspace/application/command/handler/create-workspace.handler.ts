import { AggregateRepository, InjectAggregateRepository } from '@aulasoftwarelibre/nestjs-eventstore';
import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Err, Ok, Result } from 'neverthrow';

import { WorkspaceAlreadyExistsError, WorkspaceOwnerNotFoundError } from '../../../domain/exception';
import { WorkspaceError } from '../../../domain/exception/workspace-error';
import { Workspace } from '../../../domain/model';
import {
	WorkspaceDescription,
	WorkspaceId,
	WorkspaceLocation,
	WorkspaceName,
	WorkspaceService,
} from '../../../domain/model/value-objects';
import { CreateWorkspaceCommand } from '../../../application/command/create-workspace.command';
import { WORKSPACE_FINDER, WorkspaceFinder } from '../../../application/service/workspace-finder.service';
import { REDIS_SERVICE, RedisService } from '../../../../redis.module';
import { WorkspaceOwnerId } from '../../../domain/model/value-objects/workspace-owner-id';
import { USER_FINDER, UserFinder } from '../../../../user/application/service/user-finder.service';
import { ClientKafka } from '@nestjs/microservices';


@CommandHandler(CreateWorkspaceCommand)
export class CreateWorkspaceHandler implements ICommandHandler<CreateWorkspaceCommand> {
	constructor(
		@InjectAggregateRepository(Workspace)
		private readonly workspaceRepository: AggregateRepository<Workspace, WorkspaceId>,
		@Inject(WORKSPACE_FINDER)
		private readonly workspaceFinder: WorkspaceFinder,
		@Inject(USER_FINDER)
		private readonly userFinder: UserFinder,
		@Inject(REDIS_SERVICE)
		private readonly redisService: RedisService,
		@Inject('DATASERVICE')
		private readonly workspaceProducerClient: ClientKafka
	) { }

	async execute(command: CreateWorkspaceCommand): Promise<Result<null, WorkspaceError>> {

		const id = WorkspaceId.fromString(command.id);
		if (await this.workspaceFinder.find(id)) return new Err(WorkspaceAlreadyExistsError.withId(id));

		const owner = WorkspaceOwnerId.fromString(command.owner)

		if (await this.userFinder.find(owner) === null) return new Err(WorkspaceOwnerNotFoundError.withOwner(owner))

		const name = WorkspaceName.fromString(command.name);
		const description = WorkspaceDescription.fromString(command.description);
		const location = new WorkspaceLocation(command.street, command.city, command.country);

		const workspaceServicesresult = WorkspaceService.fromStringList(command.services)

		return workspaceServicesresult.match<Result<null, WorkspaceError>>(
			(workspaceServices) => {

				const workspace = Workspace.add(id, owner, name, description, location, workspaceServices);
				this.workspaceRepository.save(workspace);

				console.log('workspace was created!')
				this.workspaceProducerClient.emit('workspace_created', { workspaceId: id.value })

				return new Ok(null)
			},
			(err) => {

				return new Err(err)
			}
		)
	}
}

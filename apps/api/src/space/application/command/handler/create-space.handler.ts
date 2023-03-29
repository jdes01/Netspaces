import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Err, Ok, Result } from 'ts-results';
import { SpaceError } from '../../../domain/exception/space-error';
import { Space } from '../../../domain/model';
import { CreateSpaceCommand } from '../../command/create-space.command';
import { AggregateRepository, InjectAggregateRepository } from '@aulasoftwarelibre/nestjs-eventstore';
import { Inject } from '@nestjs/common';
import { SpaceFinder, SPACE_FINDER } from '../../service/space-finder.service';
import { SpaceAlreadyExistsError } from '../../../domain/exception';
import { SpaceId, SpaceName, SpaceQuantity, SpaceSeats } from '../../../domain/model/value-objects';
import { SpaceAmenity } from '../../../domain/model/value-objects/space-amenities';
import { WorkspaceId } from 'apps/api/src/workspace/domain/model/value-objects';
import { WorkspaceNotFoundError } from 'apps/api/src/workspace/domain/exception/workspace-not-found-error';
import { WorkspaceFinder, WORKSPACE_FINDER } from 'apps/api/src/workspace/application/service/workspace-finder.service';
import { WorkspaceError } from 'apps/api/src/workspace/domain/exception';

@CommandHandler(CreateSpaceCommand)
export class CreateSpaceHandler implements ICommandHandler<CreateSpaceCommand> {
	constructor(
		@InjectAggregateRepository(Space)
		private readonly spaceRepository: AggregateRepository<Space, SpaceId>,
		@Inject(SPACE_FINDER) private readonly spaceFinder: SpaceFinder,
		@Inject(WORKSPACE_FINDER)
		private readonly workspaceFinder: WorkspaceFinder,
	) {}

	async execute(command: CreateSpaceCommand): Promise<Result<null, SpaceError | WorkspaceError>> {
		const id = SpaceId.fromString(command.id);
		if (await this.spaceFinder.find(id)) {
			return Err(SpaceAlreadyExistsError.withId(id));
		}

		const workspaceId = WorkspaceId.fromString(command.workspaceId);
		if (!(await this.workspaceFinder.find(workspaceId))) {
			return Err(WorkspaceNotFoundError.withId(workspaceId));
		}

		const name = SpaceName.fromString(command.name);
		const quantity = SpaceQuantity.fromNumber(command.quantity);
		const seats = SpaceSeats.fromNumber(command.seats);

		try {
			var amenities = command.amenities.map((amenity) => SpaceAmenity.fromString(amenity));
		} catch (e) {
			return Err(e);
		}

		const space = Space.add(id, workspaceId, name, quantity, seats, amenities);

		this.spaceRepository.save(space);

		return Ok(null);
	}
}

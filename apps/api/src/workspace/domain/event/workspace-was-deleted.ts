import { Event } from '@aulasoftwarelibre/nestjs-eventstore';
import { DeleteWorkspaceDTO } from '@netspaces/contracts';

export class WorkspaceWasDeletedEvent extends Event<DeleteWorkspaceDTO> {
	constructor(public readonly id: string) {
		super(id, { _id: id });
	}
}

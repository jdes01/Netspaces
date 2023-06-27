import { Ok } from 'neverthrow';

import { InMemorySpaceRepository } from '../../../test';
import {
  SpaceAmenity,
  SpaceId,
  SpaceName,
  SpaceQuantity,
  SpaceSeats,
} from '../../domain/model/value-objects';
import { Space } from '../../domain/model';
import {
  WorkspaceId,
  WorkspaceName,
} from '../../../workspace/domain/model/value-objects';
import { DeleteSpaceCommand } from '../command/delete-space.command';
import { DeleteSpaceHandler } from '../command/handler/delete-space.handler';

describe('DeleteSpaceHandler', () => {
  let id: SpaceId;
  let workspaceId: WorkspaceId;
  let name: WorkspaceName;
  let quantity: SpaceQuantity;
  let seats: SpaceSeats;
  let amenitys: Array<SpaceAmenity>;

  let existingSpace: Space;
  let command: DeleteSpaceCommand;

  beforeEach(() => {
    id = SpaceId.fromString('e847261d-5539-49da-876d-bfc245e50974');
    workspaceId = WorkspaceId.fromString(
      '27afa1a9-863f-43df-9bdd-5ce93bb20ff9',
    );
    name = WorkspaceName.fromString('workspace name');
    quantity = SpaceQuantity.fromNumber(2);
    seats = SpaceSeats.fromNumber(2);
    amenitys = [];
    existingSpace = Space.add(id, workspaceId, name, quantity, seats, amenitys);
    command = new DeleteSpaceCommand(id.value);
  });

  it('should delete an existing space successfully', async () => {
    const spaceRepository = new InMemorySpaceRepository([existingSpace]);
    const handler = new DeleteSpaceHandler(spaceRepository);

    const result = await handler.execute(command);

    expect(result).toBeInstanceOf(Ok);
    expect(spaceRepository.spaces[0].deleted).toBe(true);
  });
});

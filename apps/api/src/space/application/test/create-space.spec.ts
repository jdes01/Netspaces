import { Err, Ok } from 'neverthrow';

import { CreateSpaceCommand } from '../command/create-space.command'
import { CreateSpaceHandler } from '../command/handler/create-space.handler'
import { InMemorySpaceFinder, InMemorySpaceRepository, InMemoryWorkspaceFinder } from '../../../test';
import { SpaceDTO, WorkspaceDTO } from '@netspaces/contracts';
import { SpaceAlreadyExistsError } from '../../domain/exception';
import { SpaceId } from '../../domain/model/value-objects';
import { SpaceAmenitysTypes } from '@netspaces/domain';
import { WorkspaceNotFoundError } from '../../../workspace/domain/exception/workspace-not-found-error';
import { WorkspaceId } from '../../../workspace/domain/model/value-objects';

describe('CreateSpaceHandler', () => {

    let id: string
    let workspaceId: string
    let name: string
    let quantity: number
    let seats: number
    let amenitys: Array<SpaceAmenitysTypes>

    let existingSpace: SpaceDTO
    let existingWorkspace: WorkspaceDTO
    let command: CreateSpaceCommand

    beforeEach(() => {
        id = 'e847261d-5539-49da-876d-bfc245e50974';
        workspaceId = '27afa1a9-863f-43df-9bdd-5ce93bb20ff9'
        name = 'workspace name'
        quantity = 2
        seats = 2
        amenitys = []
        existingSpace = { _id: id, workspaceId: workspaceId, name: name, quantity: quantity, seats: seats, amenitys: amenitys }
        existingWorkspace = { _id: workspaceId, companyId: "companyId", name: "name", description: "description", street: "street", city: "city", country: "country", services: ["services"] }
        command = new CreateSpaceCommand(id, workspaceId, name, quantity, seats, amenitys);
    });

    it('should creates a new space successfully', async () => {

        const spaceRepository = new InMemorySpaceRepository([]);
        const spaceFinder = new InMemorySpaceFinder([]);
        const workspaceFinder = new InMemoryWorkspaceFinder([existingWorkspace])
        const handler = new CreateSpaceHandler(spaceRepository, spaceFinder, workspaceFinder);

        const result = await handler.execute(command);

        expect(result).toBeInstanceOf(Ok)
        expect(spaceRepository.spaces.length).toBe(1)
    });

    it('should return error with existing space', async () => {

        const spaceRepository = new InMemorySpaceRepository([]);
        const spaceFinder = new InMemorySpaceFinder([existingSpace]);
        const workspaceFinder = new InMemoryWorkspaceFinder([existingWorkspace])
        const handler = new CreateSpaceHandler(spaceRepository, spaceFinder, workspaceFinder);

        const result = await handler.execute(command);

        expect(result).toEqual(new Err(SpaceAlreadyExistsError.withId(SpaceId.fromString(id))))
    });

    it('should return error when workspace not found', async () => {

        const spaceRepository = new InMemorySpaceRepository([]);
        const spaceFinder = new InMemorySpaceFinder([]);
        const workspaceFinder = new InMemoryWorkspaceFinder([])
        const handler = new CreateSpaceHandler(spaceRepository, spaceFinder, workspaceFinder);

        const result = await handler.execute(command);

        expect(result).toEqual(new Err(WorkspaceNotFoundError.withId(WorkspaceId.fromString(workspaceId))))
    });

});

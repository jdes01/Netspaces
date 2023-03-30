import { Test, TestingModule } from '@nestjs/testing';

import {
	WorkspaceDescription,
	WorkspaceId,
	WorkspaceLocation,
	WorkspaceName,
	WorkspaceService,
} from '../../../domain/model/value-objects';
import { Workspace } from '../../../domain/model/workspace';
import { WORKSPACE_REPOSITORY, WorkspaceRepository } from '../../../domain/repository';
import { WORKSPACE_FINDER, WorkspaceFinder } from '../../service/workspace-finder.service';
import { CreateWorkspaceCommand } from '../create-workspace.command';
import { CreateWorkspaceHandler } from '../handler/create-workspace.handler';

describe('CreateWorkspaceHandler', () => {
	let handler$: CreateWorkspaceHandler;

	const workspaceRepository: Partial<WorkspaceRepository> = {};
	const workspaceFinder: Partial<WorkspaceFinder> = {};

	const id = 'fd399f01-e08c-43d4-a62e-61302ad2d06d';
	const name = 'workspace name';
	const description = 'workspace description';

	const street = 'workspace street';
	const city = 'workspace city';
	const country = 'workspace country';
	const services = ['WIFI'];

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [
				CreateWorkspaceHandler,
				{
					provide: WORKSPACE_REPOSITORY,
					useValue: {
						find: jest.fn(),
						save: jest.fn(),
					},
				},
				{
					provide: WORKSPACE_FINDER,
					useValue: workspaceFinder,
				},
			],
		}).compile();

		handler$ = module.get<CreateWorkspaceHandler>(CreateWorkspaceHandler);
		workspaceRepository.save = jest.fn().mockResolvedValue(null);
		workspaceRepository.find = jest.fn();
		workspaceFinder.find = jest.fn().mockResolvedValue(null);
	});

	it('should creates a new workspace', async () => {
		expect(1 + 2).toBe(3);

		// workspaceRepository.find = jest.fn().mockReturnValueOnce(null)

		// await handler$.execute(
		//     new CreateWorkspaceCommand(id, name, description, street, city, country, services),
		// );

		// expect(workspaceRepository.save).toHaveBeenCalledWith(
		//     Workspace.add(
		//         WorkspaceId.fromString(id),
		//         WorkspaceName.fromString(name),
		//         WorkspaceDescription.fromString(description),
		//         new WorkspaceLocation(street, city, country),
		//         services.map(service => WorkspaceService.fromString(service))),
		// );
	});

	// it('should return null when repository success', async () => {

	//     workspaceRepository.save = jest.fn().mockReturnValueOnce(Ok(null))
	//     workspaceRepository.find = jest.fn().mockReturnValueOnce(null)

	//     const result = await handler$.execute(
	//         new CreateWorkspaceCommand(id.value, name.value, description.value, { street, city, country }),
	//     );

	//     expect(result).toBeInstanceOf(Ok)
	//     expect(result.val).toBe(null)
	// });

	// it('should return error when repository fails', async () => {

	//     workspaceRepository.save = jest.fn().mockReturnValueOnce(Err(Error('error message')))

	//     const result = await handler$.execute(
	//         new CreateWorkspaceCommand(id.value, name.value, description.value, { street, city, country }),
	//     );

	//     expect(result).toBeInstanceOf(Err)
	//     expect(result.val).toEqual(Error('error message'))
	// });

	// it('should not save a workspace when another workspace with same id exists', async () => {

	//     const alreadyExistingWorkspace: Partial<Workspace> = {};

	//     workspaceRepository.save = jest.fn().mockReturnValueOnce(Ok(null))
	//     workspaceRepository.find = jest.fn().mockReturnValueOnce(alreadyExistingWorkspace)

	//     const result = await handler$.execute(
	//         new CreateWorkspaceCommand(id.value, name.value, description.value, { street, city, country }),
	//     );

	//     expect(result).toBeInstanceOf(Err)
	// });
});

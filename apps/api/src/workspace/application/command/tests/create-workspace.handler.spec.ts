import { Test, TestingModule } from '@nestjs/testing';
import { City, Country, Street, WorkspaceDescription, WorkspaceId, WorkspaceLocation, WorkspaceName } from '../../../domain/model/value-objects';
import { Workspace } from '../../../domain/model/workspace';
import { CreateWorkspaceCommand } from '../create-workspace.command'
import { CreateWorkspaceHandler } from '../../handler/create-workspace.handler'

import { WorkspaceRepository } from './../../../domain/repository/workspace.repository'
import { WORKSPACE_REPOSITORY } from '../../../domain/repository';
import { Err, Ok } from 'ts-results';


describe('CreateWorkspaceHandler', () => {
    let handler$: CreateWorkspaceHandler;

    const workspace_repository: Partial<WorkspaceRepository> = {};

    const id = WorkspaceId.fromString('fd399f01-e08c-43d4-a62e-61302ad2d06d')
    const name = WorkspaceName.fromString('workspace name')
    const description = WorkspaceDescription.fromString('workspace description')

    const street: Street = { name: 'workspace street' }
    const city: City = { name: 'workspace city' }
    const country: Country = { name: 'workspace country' }
    const location: WorkspaceLocation = WorkspaceLocation.create({ street, city, country })

    beforeEach(async () => {

        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CreateWorkspaceHandler,
                {
                    provide: WORKSPACE_REPOSITORY,
                    useValue: workspace_repository
                },
            ],
        }).compile();

        handler$ = module.get<CreateWorkspaceHandler>(CreateWorkspaceHandler);
        workspace_repository.save = jest.fn();
    });

    it('should creates a new workspace', async () => {
        await handler$.handle(
            new CreateWorkspaceCommand(id.value, name.value, description.value, { street, city, country }),
        );

        expect(workspace_repository.save).toHaveBeenCalledWith(
            Workspace.add(id, name, description, location),
        );
    });

    it('should return null when repository success', async () => {

        workspace_repository.save = jest.fn().mockReturnValueOnce(Ok(null))

        const result = await handler$.handle(
            new CreateWorkspaceCommand(id.value, name.value, description.value, { street, city, country }),
        );

        expect(result).toBeInstanceOf(Ok)
        expect(result.val).toBe(null)
    });

    it('should return error when repository success', async () => {

        workspace_repository.save = jest.fn().mockReturnValueOnce(Err(Error('error message')))

        const result = await handler$.handle(
            new CreateWorkspaceCommand(id.value, name.value, description.value, { street, city, country }),
        );

        expect(result).toBeInstanceOf(Err)
        expect(result.val).toEqual(Error('error message'))
    });
});

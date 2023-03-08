import { Test, TestingModule } from '@nestjs/testing';
import { v4 as uuid } from 'uuid';
import { City, Country, Street, WorkspaceDescription, WorkspaceId, WorkspaceLocation, WorkspaceName } from '../../../domain/model/value-objects';
import { Workspace } from '../../../domain/model/workspace';
import { CreateWorkspaceCommand } from '../create-workspace.command'
import { CreateWorkspaceHandler } from '../../handler/create-workspace.handler'


describe('CreateWorkspaceHandler', () => {
    let command$: CreateWorkspaceHandler;

    const workspaces: Partial<Workspace> = {};

    const id = WorkspaceId.fromString('fd399f01-e08c-43d4-a62e-61302ad2d06d')
    const name = WorkspaceName.fromString('workspace name')
    const description = WorkspaceDescription.fromString('workspace description')

    const street: Street = { name: 'workspace street' }
    const city: City = { name: 'workspace city' }
    const country: Country = { name: 'workspace country' }
    const location: WorkspaceLocation = WorkspaceLocation.create({ street, city, country })

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [CreateWorkspaceHandler],
        }).compile();

        command$ = module.get<CreateWorkspaceHandler>(CreateWorkspaceHandler);
    });

    it('should creates a new workspace', async () => {
        await command$.execute(
            new CreateWorkspaceCommand(id.value, name.value, description.value, { street, city, country }),
        );

        expect(workspaces.save).toHaveBeenCalledWith(
            Workspace.add(id, name, description, location),
        );
    });

    // it('should not creates an existing group name', async () => {
    //     checkUniqueGroupName.with = jest.fn().mockResolvedValue(groupId);

    //     expect(
    //         command$.execute(
    //             new CreateGroupCommand(
    //                 groupId.value,
    //                 name.value,
    //                 groupCurrencyCode.value,
    //                 owner,
    //                 groupMembers,
    //             ),
    //         ),
    //     ).rejects.toThrow(GroupNameAlreadyRegisteredError);

    //     expect(groups.save).toHaveBeenCalledTimes(0);
    // });

    // it('should not creates an existing group id', async () => {
    //     groups.find = jest
    //         .fn()
    //         .mockResolvedValue(Group.add(groupId, name, groupCurrencyCode, ownerId));

    //     expect(
    //         command$.execute(
    //             new CreateGroupCommand(
    //                 groupId.value,
    //                 name.value,
    //                 groupCurrencyCode.value,
    //                 owner,
    //                 groupMembers,
    //             ),
    //         ),
    //     ).rejects.toThrow(GroupIdAlreadyRegisteredError);

    //     expect(groups.save).toHaveBeenCalledTimes(0);
    // });
});

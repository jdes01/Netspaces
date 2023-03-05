import { WorkspaceDescription, WorkspaceId, WorkspaceLocation, WorkspaceName, Street, City, Country, WorkspaceService, LocationCreationParams } from '../value-objects';
import { Workspace } from '../workspace'

describe('Workspace entity', () => {

    it('should create an instance successfully', async () => {

        const id = WorkspaceId.fromString('79cb910f-e2de-4c16-83f4-0d65c6bed2fc')
        const name = WorkspaceName.fromString('workspace name')
        const description = WorkspaceDescription.fromString('workspace description')

        const street: Street = { name: 'workspace street' }
        const city: City = { name: 'workspace city' }
        const country: Country = { name: 'workspace country' }
        const location: WorkspaceLocation = WorkspaceLocation.create({ street, city, country })

        const workspace = Workspace.add(id, name, description, location);

        expect(workspace.name).toEqual(name)
        expect(workspace.location.city).toEqual(city)
        expect(workspace.deleted).toBe(null)
    });

    it('should be able to add multile services', async () => {

        const id = WorkspaceId.fromString('79cb910f-e2de-4c16-83f4-0d65c6bed2fc')
        const name = WorkspaceName.fromString('workspace name')
        const description = WorkspaceDescription.fromString('workspace description')

        const street: Street = { name: 'workspace street' }
        const city: City = { name: 'workspace city' }
        const country: Country = { name: 'workspace country' }
        const location: WorkspaceLocation = WorkspaceLocation.create({ street, city, country })

        const workspace = Workspace.add(id, name, description, location);

        const wifi_service = WorkspaceService.WIFI

        workspace.add_service(wifi_service)

        expect(workspace)
        expect(workspace.services.length).toBe(1)
        expect(workspace.services[0]).toBe(WorkspaceService.WIFI)
    });

});
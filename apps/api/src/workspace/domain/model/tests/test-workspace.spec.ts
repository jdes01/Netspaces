import { CqrsModule, EventBus, EventPublisher } from '@nestjs/cqrs';
import { Test, TestingModule } from '@nestjs/testing';
import { WorkspaceDescription, WorkspaceId, WorkspaceLocation, WorkspaceName, Street, City, Country, WorkspaceService, LocationDTO } from '../value-objects';
import { Workspace } from '../workspace'

describe('Workspace entity', () => {

    let eventBus$: EventBus;
    let eventPublisher$: EventPublisher;

    let workspace: Workspace

    const id = WorkspaceId.fromString('79cb910f-e2de-4c16-83f4-0d65c6bed2fc')
    const name = WorkspaceName.fromString('workspace name')
    const description = WorkspaceDescription.fromString('workspace description')
    const street: Street = { name: 'workspace street' }
    const city: City = { name: 'workspace city' }
    const country: Country = { name: 'workspace country' }
    const location: WorkspaceLocation = WorkspaceLocation.create({ street, city, country })

    const wifiService = WorkspaceService.WIFI

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [CqrsModule],
        }).compile();

        eventPublisher$ = module.get<EventPublisher>(EventPublisher);
        eventBus$ = module.get<EventBus>(EventBus);
        eventBus$.publish = jest.fn();
    });

    it('should create an instance successfully', async () => {

        workspace = eventPublisher$.mergeObjectContext(
            Workspace.add(id, name, description, location)
        );
        workspace.commit();

        // expect(eventBus$.publish).toHaveBeenCalledTimes(1);
        // expect(eventBus$.publish).toHaveBeenCalledWith(
        //     new SpaceWasCreated(
        //         id.value,
        //         name.value,
        //         quantity,
        //         seats,
        //     ),
        // );
    });

    it('should have a name', async () => {
        expect(workspace.name).toEqual(name)
    });


    it('should have a location', async () => {
        expect(workspace.location.street).toEqual(street)
        expect(workspace.location.city).toEqual(city)
        expect(workspace.location.country).toEqual(country)
    });

    it('should not be deleted', async () => {
        expect(workspace.deleted).toBe(null)
    });

    it('should be able to add multile services', async () => {
        workspace.add_service(wifiService)
        expect(workspace)
        expect(workspace.services.length).toBe(1)
        expect(workspace.services[0]).toBe(WorkspaceService.WIFI)
    });

});
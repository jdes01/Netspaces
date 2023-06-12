import { Err, Ok } from 'neverthrow';
import { WorkspaceService } from '../value-objects';

describe('WorkspaceService', () => {

    it('should create successfully', async () => {

        const service = "WIFI"

        const workspaceService = WorkspaceService.fromString(service)

        expect(workspaceService).toBeInstanceOf(Ok)
    });


    it('should fail with invalid string', async () => {

        const service = "invalid"

        const workspaceService = WorkspaceService.fromString(service)

        expect(workspaceService).toBeInstanceOf(Err)
    });

    it('should create list successfully', async () => {

        const services = ["WIFI", "COFFEE"]

        const workspaceService = WorkspaceService.fromStringList(services)

        expect(workspaceService).toBeInstanceOf(Ok)
    });

    it('should fail with invalid list', async () => {

        const services = ["WIFI", "invalid"]

        const workspaceService = WorkspaceService.fromStringList(services)

        expect(workspaceService).toBeInstanceOf(Err)
    });

});

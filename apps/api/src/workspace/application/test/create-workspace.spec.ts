import { Err, Ok } from 'neverthrow';

import { CreateWorkspaceCommand } from '../command/create-workspace.command'
import { CreateWorkspaceHandler } from '../command/handler/create-workspace.handler'
import { InMemoryWorkspaceFinder, InmemoryRedisService, InMemoryWorkspaceRepository, InMemoryCompanyFinder } from '../../../test';
import { CompanyDTO, WorkspaceDTO } from '@netspaces/contracts';
import { WorkspaceAlreadyExistsError } from '../../domain/exception';
import { WorkspaceId } from '../../domain/model/value-objects';
import { CompanyNotFoundError } from '../../../company/domain/exception';
import { CompanyId } from '../../../company/domain/model/value-objects';
import { WorkspaceServiceNotValidError } from '../../domain/exception/workspace-service-not-valid-error';

describe('CreateWorkspaceHandler', () => {

    let id: string
    let companyId: string
    let name: string
    let description: string
    let street: string
    let city: string
    let country: string
    let services: Array<string>
    let existingCompany: CompanyDTO
    let existingWorkspace: WorkspaceDTO
    let command: CreateWorkspaceCommand
    let redisService: InmemoryRedisService

    beforeEach(() => {
        id = 'e847261d-5539-49da-876d-bfc245e50974';
        companyId = '71c86c41-2593-44c4-9054-90b19e2969be'
        name = 'workspace name';
        street = 'street'
        city = 'city'
        country = 'country'
        services = ['WIFI', 'KITCHEN']
        existingCompany = { _id: companyId, name: name }
        existingWorkspace = { _id: id, companyId: companyId, name: name, description: description, street: street, city: city, country: country, services: services }
        command = new CreateWorkspaceCommand(id, companyId, name, description, street, city, country, services,
        );
        redisService = new InmemoryRedisService();
    });

    it('should creates a new workspace successfully', async () => {

        const workspaceRepository = new InMemoryWorkspaceRepository([]);
        const workspaceFinder = new InMemoryWorkspaceFinder([]);
        const companyFinder = new InMemoryCompanyFinder([existingCompany])
        const handler = new CreateWorkspaceHandler(workspaceRepository, workspaceFinder, companyFinder, redisService);

        const result = await handler.execute(command);

        expect(result).toBeInstanceOf(Ok)
        expect(workspaceRepository.workspaces.length).toBe(1)
    });

    it('should return error with existing workspace', async () => {

        const workspaceRepository = new InMemoryWorkspaceRepository([]);
        const workspaceFinder = new InMemoryWorkspaceFinder([existingWorkspace]);
        const companyFinder = new InMemoryCompanyFinder([existingCompany])
        const handler = new CreateWorkspaceHandler(workspaceRepository, workspaceFinder, companyFinder, redisService);

        const result = await handler.execute(command);

        expect(result).toEqual(new Err(WorkspaceAlreadyExistsError.withId(WorkspaceId.fromString(id))))
    });

    it('should return error with missing company', async () => {

        const workspaceRepository = new InMemoryWorkspaceRepository([]);
        const workspaceFinder = new InMemoryWorkspaceFinder([]);
        const companyFinder = new InMemoryCompanyFinder([])
        const handler = new CreateWorkspaceHandler(workspaceRepository, workspaceFinder, companyFinder, redisService);

        const result = await handler.execute(command);

        expect(result).toEqual(new Err(CompanyNotFoundError.withId(CompanyId.fromString(companyId))))
    });

    it('should return error with invalid service', async () => {

        const workspaceRepository = new InMemoryWorkspaceRepository([]);
        const workspaceFinder = new InMemoryWorkspaceFinder([]);
        const companyFinder = new InMemoryCompanyFinder([existingCompany])
        const handler = new CreateWorkspaceHandler(workspaceRepository, workspaceFinder, companyFinder, redisService);

        const invalidServices = ["invalid", "services"]

        const command = new CreateWorkspaceCommand(id, companyId, name, description, street, city, country, invalidServices);

        const result = await handler.execute(command);

        expect(result).toEqual(new Err(WorkspaceServiceNotValidError.withService(invalidServices[0])))

    });
});

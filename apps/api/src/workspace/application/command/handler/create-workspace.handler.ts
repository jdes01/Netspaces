import { InjectAggregateRepository } from '@aulasoftwarelibre/nestjs-eventstore';
import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Err, Ok, Result } from 'neverthrow';

import { REDIS_SERVICE } from '../../../../redis.module';
import { CreateWorkspaceCommand } from '../../../application/command/create-workspace.command';
import {
  WORKSPACE_FINDER,
  WorkspaceFinder,
} from '../../../application/service/workspace-finder.service';
import {
  WorkspaceAlreadyExistsError,
  WorkspaceCompanyNotFoundError,
} from '../../../domain/exception';
import { WorkspaceError } from '../../../domain/exception/workspace-error';
import { Workspace } from '../../../domain/model';
import {
  WorkspaceDescription,
  WorkspaceId,
  WorkspaceLocation,
  WorkspaceName,
  WorkspaceService,
} from '../../../domain/model/value-objects';
import { WorkspaceCompanyId } from '../../../domain/model/value-objects/workspace-company-id';
import {
  COMPANY_FINDER,
  CompanyFinder,
} from '../../../../company/application/service/company-finder.service';
import { WorkspaceRepository } from '../../../domain/service/repository.service';
import { RedisService } from '../../../../user/domain/service/redis.service';

@CommandHandler(CreateWorkspaceCommand)
export class CreateWorkspaceHandler
  implements ICommandHandler<CreateWorkspaceCommand>
{
  constructor(
    @InjectAggregateRepository(Workspace)
    private readonly workspaceRepository: WorkspaceRepository<
      Workspace,
      WorkspaceId
    >,
    @Inject(WORKSPACE_FINDER)
    private readonly workspaceFinder: WorkspaceFinder,
    @Inject(COMPANY_FINDER)
    private readonly companyFinder: CompanyFinder,
    @Inject(REDIS_SERVICE)
    private readonly redisService: RedisService,
  ) { }

  async execute(
    command: CreateWorkspaceCommand,
  ): Promise<Result<null, WorkspaceError>> {
    const id = WorkspaceId.fromString(command.id);
    if (await this.workspaceFinder.find(id))
      return new Err(WorkspaceAlreadyExistsError.withId(id));

    const companyId = WorkspaceCompanyId.fromString(command.companyId);

    if ((await this.companyFinder.find(companyId)) === null)
      return new Err(WorkspaceCompanyNotFoundError.withCompany(companyId));

    const name = WorkspaceName.fromString(command.name);
    const description = WorkspaceDescription.fromString(command.description);
    const location = new WorkspaceLocation(
      command.street,
      command.city,
      command.country,
    );

    const workspaceServicesresult = WorkspaceService.fromStringList(
      command.services,
    );

    return workspaceServicesresult.match<Result<null, WorkspaceError>>(
      (workspaceServices) => {
        const workspace = Workspace.add(
          id,
          companyId,
          name,
          description,
          location,
          workspaceServices,
          command.images
        );
        this.workspaceRepository.save(workspace);
        return new Ok(null);
      },
      (err) => {
        return new Err(err);
      },
    );
  }
}

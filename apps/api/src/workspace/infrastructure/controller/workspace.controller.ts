import {
  Controller,
  Get,
  Logger,
  Param,
} from '@nestjs/common';
import { CreateWorkspaceDTO, WorkspaceDTO } from '@netspaces/contracts';

import { WorkspaceService } from '../service/workspace.service';
import { ElasticsearchService } from '@nestjs/elasticsearch';

@Controller('workspaces')
export class WorkspaceController {
  constructor(
    private readonly workspaceService: WorkspaceService,
    private readonly elasticsearchService: ElasticsearchService,
  ) { }

  @Get(':name')
  async searchByName(@Param() params: any): Promise<any> {
    Logger.log(params.name);
    return await this.elasticsearchService.search({
      index: 'workspaces',
      query: {
        match: { name: params.name },
      },
    });
  }
}

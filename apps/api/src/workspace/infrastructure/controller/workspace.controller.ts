import { Body, Controller, Get, Logger, Post } from "@nestjs/common";

import { CreateWorkspaceDTO } from "@netspaces/contracts"
import { WorkspaceService } from "../service/workspace.service";


@Controller('workspace')
export class WorkspaceController {
    constructor(private readonly workspaceService: WorkspaceService) { }

    @Post()
    async create(@Body() createWorkspaceDTO: CreateWorkspaceDTO) {
        Logger.log(createWorkspaceDTO._id)
        return await this.workspaceService.createWorkspace(
            createWorkspaceDTO._id,
            createWorkspaceDTO.name,
            createWorkspaceDTO.description,
            createWorkspaceDTO.street,
            createWorkspaceDTO.city,
            createWorkspaceDTO.country,
        );
    }

    @Get()
    async getAll(): Promise<Array<CreateWorkspaceDTO>> {
        return await this.workspaceService.getWorkspaces();
    }
}

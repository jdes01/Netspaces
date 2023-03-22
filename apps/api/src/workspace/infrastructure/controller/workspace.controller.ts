import { Body, Controller, Get, Post, Response, HttpStatus, Logger } from "@nestjs/common";

import { CreateWorkspaceDTO } from "@netspaces/contracts"
import { WorkspaceAlreadyExistsError } from "../../domain/exception";
import { WorkspaceService } from "../service/workspace.service";


@Controller('workspace')
export class WorkspaceController {
    constructor(private readonly workspaceService: WorkspaceService) { }

    @Post()
    async create(@Body() createWorkspaceDTO: CreateWorkspaceDTO, @Response() response: Response) {

        const result = await this.workspaceService.createWorkspace(
            createWorkspaceDTO._id,
            createWorkspaceDTO.name,
            createWorkspaceDTO.description,
            createWorkspaceDTO.street,
            createWorkspaceDTO.city,
            createWorkspaceDTO.country,
        );

        if (result.val instanceof WorkspaceAlreadyExistsError) {
            await response.status(HttpStatus.CONFLICT).json({ error: result.val.message }).send()
        }

        response.status(HttpStatus.OK).send()
    }

    @Get()
    async getAll(): Promise<Array<CreateWorkspaceDTO>> {
        return await this.workspaceService.getWorkspaces();
    }
}

import { Body, Controller, Get, Post, HttpStatus, HttpException, HttpCode, ValidationPipe } from "@nestjs/common";

import { CreateWorkspaceDTO, WorkspaceDTO } from "@netspaces/contracts"
import { Err } from "ts-results";
import { WorkspaceService } from "../service/workspace.service";


@Controller('workspace')
export class WorkspaceController {
    constructor(private readonly workspaceService: WorkspaceService) { }

    @Post()
    @HttpCode(200)
    async create(@Body(new ValidationPipe()) createWorkspaceDTO: CreateWorkspaceDTO) {

        const result = await this.workspaceService.createWorkspace(
            createWorkspaceDTO._id,
            createWorkspaceDTO.name,
            createWorkspaceDTO.description,
            createWorkspaceDTO.street,
            createWorkspaceDTO.city,
            createWorkspaceDTO.country,
            createWorkspaceDTO.services.map(service => service.toString()),
        );

        if (result instanceof Err) {
            throw new HttpException(result.val.message, HttpStatus.CONFLICT);
        }

        return result.val

    }

    @Get()
    async getAll(): Promise<Array<WorkspaceDTO>> {
        return await this.workspaceService.getWorkspaces();
    }
}

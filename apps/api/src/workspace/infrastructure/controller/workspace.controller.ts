import {
	Body,
	Controller,
	Get,
	HttpCode,
	HttpException,
	HttpStatus,
	Inject,
	Param,
	Post,
	ValidationPipe,
} from '@nestjs/common';
import { CreateWorkspaceDTO, WorkspaceDTO } from '@netspaces/contracts';

import { WorkspaceService } from '../service/workspace.service';
import { WorkspaceError } from '../../domain/exception';

@Controller('workspaces')
export class WorkspaceController {

	constructor(
		private readonly workspaceService: WorkspaceService,
	) { }

	@Post()
	@HttpCode(200)
	async create(
		@Body(new ValidationPipe())
		createWorkspaceDTO: CreateWorkspaceDTO,
	) {
		const createdWorkspaceResult = await this.workspaceService.createWorkspace(
			createWorkspaceDTO._id,
			createWorkspaceDTO.owner,
			createWorkspaceDTO.name,
			createWorkspaceDTO.description,
			createWorkspaceDTO.street,
			createWorkspaceDTO.city,
			createWorkspaceDTO.country,
			createWorkspaceDTO.services.map((service) => service.toString()),
		);

		createdWorkspaceResult.mapErr<WorkspaceError>(
			(err) => {
				throw new HttpException(err.message, HttpStatus.CONFLICT);
			}
		)
	}

	@Get()
	async getAll(): Promise<Array<WorkspaceDTO>> {
		return await this.workspaceService.getWorkspaces();
	}

	@Get(':id')
	async getById(@Param() params: any): Promise<WorkspaceDTO> {
		return await this.workspaceService.getWorkspaceById(params.id);
	}
}

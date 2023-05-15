import {
	Body,
	Controller,
	Get,
	HttpCode,
	HttpException,
	HttpStatus,
	Param,
	Post,
	ValidationPipe,
} from '@nestjs/common';
import { CreateSpaceDTO, SpaceDTO } from '@netspaces/contracts';

import { SpaceError } from '../../domain/exception';
import { SpaceService } from '../service/space.service';

@Controller('spaces')
export class SpaceController {
	constructor(private readonly spaceService: SpaceService) {}

	@Post()
	@HttpCode(200)
	async create(@Body(new ValidationPipe()) createSpaceDTO: CreateSpaceDTO) {
		const createdSpaceResult = await this.spaceService.createSpace(
			createSpaceDTO._id,
			createSpaceDTO.workspaceId,
			createSpaceDTO.name,
			createSpaceDTO.quantity,
			createSpaceDTO.seats,
			createSpaceDTO.amenities.map((amenity) => amenity.toString()),
		);

		createdSpaceResult.mapErr<SpaceError>((err) => {
			throw new HttpException(err.message, HttpStatus.CONFLICT);
		});
	}

	@Get()
	async getAll(): Promise<Array<SpaceDTO>> {
		return await this.spaceService.getSpaces();
	}

	@Get(':id')
	async getById(@Param() params: any): Promise<SpaceDTO> {
		return await this.spaceService.getSpaceById(params.id);
	}
}

import { Body, Controller, Get, Post, HttpStatus, HttpException, HttpCode, ValidationPipe } from "@nestjs/common";

import { CreateSpaceDTO, SpaceDTO } from "@netspaces/contracts"
import { Err } from "ts-results";
import { SpaceService } from "../service/space.service";


@Controller('space')
export class SpaceController {
    constructor(private readonly spaceService: SpaceService) { }

    @Post()
    @HttpCode(200)
    async create(@Body(new ValidationPipe()) createSpaceDTO: CreateSpaceDTO) {

        const result = await this.spaceService.createSpace(
            createSpaceDTO._id,
            createSpaceDTO.quantity,
        );

        if (result instanceof Err) {
            throw new HttpException(result.val.message, HttpStatus.CONFLICT);
        }

        return result.val

    }

    @Get()
    async getAll(): Promise<Array<SpaceDTO>> {
        return await this.spaceService.getSpaces();
    }
}

// @ts-nocheck

import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class DeleteSpaceDTO {
    @ApiProperty()
    @IsNotEmpty()
    @IsUUID()
    readonly _id: string;
}

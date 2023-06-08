// @ts-nocheck

import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class UpdateWorkspaceNameDTO {
    @ApiProperty()
    @IsNotEmpty()
    @IsUUID()
    readonly _id: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    readonly name: string;
}

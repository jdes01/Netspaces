// @ts-nocheck

import { ApiProperty } from '@nestjs/swagger';
import { WorkspaceServicesTypes } from '@netspaces/domain';
import { IsArray, IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class UpdateWorkspaceLocationDTO {
    @ApiProperty()
    @IsNotEmpty()
    @IsUUID()
    readonly _id: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    readonly street: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    readonly city: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    readonly country: string;
}

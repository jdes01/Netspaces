// @ts-nocheck

import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsUUID } from 'class-validator';
import { SerializedDate } from '../../../../../domain/src/lib/serialized-date'

export class CreateBookingDTO {
    @ApiProperty()
    @IsNotEmpty()
    @IsUUID()
    readonly _id: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsUUID()
    readonly userId: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    readonly workspaceId: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    readonly spaceId: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    readonly date: SerializedDate;
}

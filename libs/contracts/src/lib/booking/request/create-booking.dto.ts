// @ts-nocheck

import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString, IsUUID } from 'class-validator';
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
    @IsNumber()
    readonly day: number;

    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    readonly month: number;

    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    readonly year: number;
}

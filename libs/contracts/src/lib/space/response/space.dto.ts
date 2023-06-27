// @ts-nocheck

import { ApiProperty } from '@nestjs/swagger';
import { SpaceAmenitysTypes } from '@netspaces/domain';
import { IsNotEmpty, IsUUID } from 'class-validator';

export class SpaceDTO {
  @ApiProperty()
  @IsNotEmpty()
  @IsUUID()
  readonly _id: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsUUID()
  readonly workspaceId: string;

  @ApiProperty()
  @IsNotEmpty()
  readonly name: string;

  @ApiProperty()
  @IsNotEmpty()
  readonly quantity: number;

  @ApiProperty()
  @IsNotEmpty()
  readonly seats: number;

  @ApiProperty()
  @IsNotEmpty()
  readonly amenitys: Array<SpaceAmenitysTypes>;
}

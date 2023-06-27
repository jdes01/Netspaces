// @ts-nocheck

import { ApiProperty } from '@nestjs/swagger';
import { SpaceAmenitysTypes } from '@netspaces/domain';
import { IsNotEmpty, IsUUID } from 'class-validator';

export class UpdateSpaceSeatsDTO {
  @ApiProperty()
  @IsNotEmpty()
  @IsUUID()
  readonly _id: string;

  @ApiProperty()
  @IsNotEmpty()
  readonly seats: number;
}

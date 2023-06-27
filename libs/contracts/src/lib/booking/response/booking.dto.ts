// @ts-nocheck

import { ApiProperty } from '@nestjs/swagger';

export class BookingDTO {
  @ApiProperty()
  readonly _id: string;

  @ApiProperty()
  readonly userId: string;

  @ApiProperty()
  readonly spaceId: string;

  @ApiProperty()
  readonly date: string;
}

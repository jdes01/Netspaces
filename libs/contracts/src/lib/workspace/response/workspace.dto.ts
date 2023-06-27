// @ts-nocheck

import { ApiProperty } from '@nestjs/swagger';

export class WorkspaceDTO {
  @ApiProperty()
  readonly _id: string;

  @ApiProperty()
  readonly companyId: string;

  @ApiProperty()
  readonly name: string;

  @ApiProperty()
  readonly description: string;

  @ApiProperty()
  readonly street: string;

  @ApiProperty()
  readonly city: string;

  @ApiProperty()
  readonly country: string;

  @ApiProperty()
  readonly services: Array<string>;
}

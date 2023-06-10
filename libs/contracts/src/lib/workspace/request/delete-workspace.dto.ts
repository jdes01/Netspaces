// @ts-nocheck

import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsUUID } from 'class-validator';

export class DeleteWorkspaceDTO {
	@ApiProperty()
	@IsNotEmpty()
	@IsUUID()
	readonly _id: string;
}

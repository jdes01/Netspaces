// @ts-nocheck

import { ApiProperty } from '@nestjs/swagger';

export class UserDTO {
	@ApiProperty()
	readonly _id: string;

	@ApiProperty()
	readonly name: string;
}

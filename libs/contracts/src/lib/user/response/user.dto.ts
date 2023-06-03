// @ts-nocheck

import { ApiProperty } from '@nestjs/swagger';
import { Nullable } from '@netspaces/domain';

export class UserDTO {
	@ApiProperty()
	readonly _id: string;

	@ApiProperty()
	readonly name: string;

	@ApiProperty()
	readonly companyId: Nullable<string>;
}

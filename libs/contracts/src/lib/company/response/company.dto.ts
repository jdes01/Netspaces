// @ts-nocheck

import { ApiProperty } from '@nestjs/swagger';

export class CompanyDTO {
	@ApiProperty()
	readonly _id: string;

	@ApiProperty()
	readonly name: string;
}

// @ts-nocheck

import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Space {
	@Field()
	_id: string;

	@Field()
	workspaceId: string;

	@Field()
	name: string;

	@Field()
	quantity: number;

	@Field()
	seats: number;

	@Field((_type) => [String])
	amenities: [string];
}

import { Directive, Field, ID, InputType, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
@Directive('@key(fields: "_id")')
export class Space {
	@Field((type) => ID)
	_id!: string;

	@Field()
	workspaceId?: string;

	@Field()
	name?: string;

	@Field()
	quantity?: number;

	@Field()
	seats?: number;

	@Field((_type) => [String])
	amenities?: [string];
}

@InputType()
export class SpaceInput {
	@Field()
	_id!: string;

	@Field()
	workspaceId!: string;

	@Field()
	name!: string;

	@Field(() => Int)
	quantity!: number;

	@Field(() => Int)
	seats!: number;

	@Field((_type) => [String])
	amenities?: [string];
}

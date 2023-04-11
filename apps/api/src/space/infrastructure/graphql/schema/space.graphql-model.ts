import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Space {
	@Field()
	_id: string;

	@Field({ nullable: true })
	workspaceId: string;

	@Field({ nullable: true })
	name: string;

	@Field({ nullable: true })
	quantity: number;

	@Field({ nullable: true })
	seats: number;

	@Field((_type) => [String], { nullable: true })
	amenities: [string];
}

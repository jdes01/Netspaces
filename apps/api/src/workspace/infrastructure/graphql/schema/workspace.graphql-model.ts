import { Field, ObjectType } from '@nestjs/graphql';
import { Space } from '../../../../space/infrastructure/graphql/schema/space.graphql-model'

@ObjectType()
export class Workspace {
	@Field()
	_id: string;

	@Field({ nullable: true })
	name: string;

	@Field({ nullable: true })
	description: string;

	@Field({ nullable: true })
	street: string;

	@Field({ nullable: true })
	city: string;

	@Field({ nullable: true })
	country: string;

	@Field((_type) => [String], { nullable: true })
	services: [string];

	@Field(() => [Space])
	space: Space[];
}

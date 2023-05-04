import { Field, InputType, ObjectType } from '@nestjs/graphql';

import { Space } from '../../../../space/infrastructure/graphql/schema/space.graphql-model';

@ObjectType()
export class Workspace {
	@Field()
	_id: string;

	@Field()
	name: string;

	@Field()
	description: string;

	@Field()
	street: string;

	@Field()
	city: string;

	@Field()
	country: string;

	@Field((_type) => [String])
	services: [string];

	@Field(() => [Space])
	space: Space[];
}

@InputType()
export class WorkspaceInput {
	@Field()
	_id: string;

	@Field()
	name: string;

	@Field()
	description: string;

	@Field()
	street: string;

	@Field()
	city: string;

	@Field()
	country: string;

	@Field(() => [String])
	services: [string];
}

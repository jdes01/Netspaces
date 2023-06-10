import { Directive, Field, ID, InputType, ObjectType } from '@nestjs/graphql';

import { Space } from '../../../../space/infrastructure/graphql/schema/space.graphql-model';

@ObjectType()
@Directive('@key(fields: "_id")')
export class Workspace {
	@Field((type) => ID)
	_id!: string;

	@Field()
	companyId?: string;

	@Field()
	name?: string;

	@Field()
	description?: string;

	@Field()
	street?: string;

	@Field()
	city?: string;

	@Field()
	country?: string;

	@Field((_type) => [String])
	services?: [string];

	@Field(() => [Space])
	space?: Space[];
}

@InputType()
export class WorkspaceInput {
	@Field()
	_id!: string;

	@Field()
	companyId!: string;

	@Field()
	name!: string;

	@Field()
	description!: string;

	@Field()
	street!: string;

	@Field()
	city!: string;

	@Field()
	country!: string;

	@Field(() => [String])
	services?: [string];
}

@InputType()
export class UpdateWorkspaceInput {
	@Field()
	_id!: string;

	@Field()
	name?: string;

	@Field()
	description?: string;

	@Field()
	street?: string;

	@Field()
	city?: string;

	@Field()
	country?: string;
}

@InputType()
export class DeleteWorkspaceInput {
	@Field()
	_id!: string;
}

import { Directive, Field, ID, InputType, ObjectType } from '@nestjs/graphql';
import { User } from 'apps/api/src/user/infrastructure/graphql/schema/user.graphql-model';

@ObjectType()
@Directive('@key(fields: "_id")')
export class Company {
	@Field((type) => ID)
	_id!: string;

	@Field()
	name!: string;

	@Field(() => [User])
	user?: User[];
}

@InputType()
export class CompanyInput {
	@Field()
	_id!: string;

	@Field()
	name!: string;
}

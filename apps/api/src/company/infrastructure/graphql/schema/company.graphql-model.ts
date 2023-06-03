import { Directive, Field, ID, InputType, ObjectType } from '@nestjs/graphql';

@ObjectType()
@Directive('@key(fields: "_id")')
export class Company {
	@Field((type) => ID)
	_id!: string;

	@Field()
	name!: string;
}

@InputType()
export class CompanyInput {
	@Field()
	_id!: string;

	@Field()
	name!: string;
}

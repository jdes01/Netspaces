import { Directive, Field, ID, InputType, ObjectType } from '@nestjs/graphql';

@ObjectType()
@Directive('@key(fields: "_id")')
export class User {
	@Field((type) => ID)
	_id!: string;

	@Field()
	name!: string;

	@Field({ nullable: true })
	companyId!: string;
}

@InputType()
export class UserInput {
	@Field()
	_id!: string;

	@Field()
	name!: string;

	@Field({ nullable: true })
	companyId!: string;
}


@InputType()
export class UpdateUserInput {
	@Field()
	_id!: string;

	@Field()
	name!: string;
}

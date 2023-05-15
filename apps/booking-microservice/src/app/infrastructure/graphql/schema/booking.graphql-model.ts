import { Field, InputType, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Booking {
	@Field()
	_id!: string;

	@Field()
	userId?: string;

	@Field()
	spaceId?: string;

	@Field()
	date?: string;
}

@InputType()
export class BookingInput {
	@Field()
	userId!: string;

	@Field()
	spaceId!: string;

	@Field()
	date!: string;
}

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
	day?: number;

	@Field()
	month?: number;

	@Field()
	year?: number;
}

@InputType()
export class BookingInput {
	@Field()
	userId!: string;

	@Field()
	spaceId!: string;

	@Field()
	day!: number;

	@Field()
	month!: number;

	@Field()
	year!: number;
}

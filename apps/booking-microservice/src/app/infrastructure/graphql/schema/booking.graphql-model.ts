import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { SerializedDate } from '@netspaces/domain';

@ObjectType()
export class Booking {
	@Field()
	_id!: string;

	@Field()
	userId?: string;

	@Field()
	workspaceId?: string;

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
	_id!: string;

	@Field()
	userId!: string;

	@Field()
	workspaceId!: string;

	@Field()
	spaceId!: string;

	@Field()
	day!: number;

	@Field()
	month!: number;

	@Field()
	year!: number;
}

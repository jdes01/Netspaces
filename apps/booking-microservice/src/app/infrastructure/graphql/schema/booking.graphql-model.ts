import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { SerializedDate } from '@netspaces/domain';

@ObjectType()
export class Booking {
	@Field()
	_id!: string;

	@Field()
	owner?: string;

	@Field()
	userId?: string;

	@Field()
	workspaceId?: string;

	@Field()
	spaceId?: string;

	@Field()
	date?: string;
}

@InputType()
export class BookingInput {
	@Field()
	_id!: string;

	@Field()
	owner!: string;

	@Field()
	userId!: string;

	@Field()
	workspaceId!: string;

	@Field()
	spaceId!: string;

	@Field()
	date!: string;
}

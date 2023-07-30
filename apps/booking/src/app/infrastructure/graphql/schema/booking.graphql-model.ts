import { Directive, Field, ID, InputType, ObjectType } from '@nestjs/graphql';

@ObjectType()
@Directive('@key(fields: "_id")')
export class Booking {
  @Field((type) => ID)
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
  userMail!: string;

  @Field()
  spaceId!: string;

  @Field()
  date!: string;
}

@InputType()
export class SpaceAvailabilityByMonthInput {
  @Field()
  spaceId!: string;

  @Field()
  month!: number;
}

@ObjectType()
export class SpaceAvailability {
  @Field()
  day: number;

  @Field()
  quantity: number;
}
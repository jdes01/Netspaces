import { Field, InputType, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class User {
    @Field()
    _id!: string;

    @Field()
    name!: string;
}

@InputType()
export class UserInput {
    @Field()
    _id!: string;

    @Field()
    name!: string;
}

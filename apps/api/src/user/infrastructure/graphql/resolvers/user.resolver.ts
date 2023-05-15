import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UserDTO } from '@netspaces/contracts';
import { GraphQLError } from 'graphql';

import { UserService } from '../../service/user.service';
import { User, UserInput } from '../schema/user.graphql-model';

@Resolver((_of: undefined) => User)
export class UserResolver {
	constructor(private readonly userService: UserService) {}

	@Query((_returns) => [User])
	async users(): Promise<UserDTO[]> {
		return await this.userService.getUsers();
	}

	@Query((_returns) => User)
	async user(@Args('id', { type: () => String }) id: string): Promise<UserDTO> {
		return await this.userService.getUserById(id);
	}

	@Mutation((_returns) => String)
	async createUser(@Args('userInput') userInput: UserInput): Promise<string> {
		const createdUserResult = await this.userService.createUser(userInput._id, userInput.name);

		return createdUserResult.match<string>(
			(_) => {
				return 'User created successfully';
			},
			(err) => {
				throw new GraphQLError(err.message);
			},
		);
	}
}

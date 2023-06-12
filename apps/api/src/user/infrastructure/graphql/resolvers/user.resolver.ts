import { Args, Mutation, Query, Resolver, ResolveReference } from '@nestjs/graphql';
import { UserDTO } from '@netspaces/contracts';
import { GraphQLError } from 'graphql';

import { UserService } from '../../service/user.service';
import { DeleteUserInput, UpdateUserInput, User, UserInput } from '../schema/user.graphql-model';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';

import { Logger } from 'winston';
import { Inject } from '@nestjs/common';

@Resolver((_of: undefined) => User)
export class UserResolver {
	constructor(
		private readonly userService: UserService,
		@Inject(WINSTON_MODULE_PROVIDER)
		private readonly logger: Logger
	) { }

	@Query((_returns) => [User])
	async users(): Promise<UserDTO[]> {
		return await this.userService.getUsers();
	}

	@Query((_returns) => User)
	async user(@Args('id', { type: () => String }) id: string): Promise<UserDTO> {
		return await this.userService.getUserById(id);
	}

	@ResolveReference()
	async resolveReference(reference: { __typename: string; _id: string }): Promise<UserDTO> {
		return await this.userService.getUserById(reference._id);
	}

	@Mutation((_returns) => String)
	async createUserWithoutCompany(@Args('userInput') userInput: UserInput): Promise<string> {
		this.logger.info("Creating user", { userId: userInput._id })

		const createdUserResult = await this.userService.createUserWithoutCompany(userInput._id, userInput.name);
		return createdUserResult.match<string>(
			(_) => {
				return 'User created successfully';
			},
			(err) => {
				throw new GraphQLError(err.message);
			},
		);
	}

	@Mutation((_returns) => String)
	async createUserWithCompany(@Args('userInput') userInput: UserInput): Promise<string> {
		this.logger.info("Creating user with company", { userId: userInput._id, companyId: userInput.companyId })

		const createdUserResult = await this.userService.createUserWithCompany(userInput._id, userInput.name, userInput.companyId);
		return createdUserResult.match<string>(
			(_) => {
				return 'User created successfully';
			},
			(err) => {
				throw new GraphQLError(err.message);
			},
		);
	}

	@Mutation((_returns) => String)
	async updateUser(@Args('userInput') userInput: UpdateUserInput): Promise<string> {
		this.logger.info("Updating user", { userId: userInput._id })

		const updatedUserResult = await this.userService.updateUser(userInput._id, userInput.name);
		return updatedUserResult.match<string>(
			(_) => {
				return 'User updated successfully';
			},
			(err) => {
				throw new GraphQLError(err.message);
			},
		);
	}

	@Mutation((_returns) => String)
	async deleteUser(@Args('deleteUserInput') deleteUserInput: DeleteUserInput): Promise<string> {
		this.logger.info("Deleting user", { userId: deleteUserInput._id })

		const deletedUserResult = await this.userService.deleteUser(deleteUserInput._id);
		return deletedUserResult.match<string>(
			(_) => {
				return 'User deleted successfully';
			},
			(err) => {
				throw new GraphQLError(err.message);
			},
		);
	}
}

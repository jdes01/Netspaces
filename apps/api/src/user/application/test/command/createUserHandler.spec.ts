import { InmemoryRedisService, InMemoryUserFinder, InMemoryUserRepository } from '../../../../test/';
import { CreateUserWithoutCompanyCommand } from '../../command/create-user-without-company.command';
import { CreateUserWithoutCompanyHandler } from '../../command/handler/create-user-without-company.handler';

describe('CreateUserHandler', () => {
	it('should creates a new user successfully', async () => {
		const userRepository = new InMemoryUserRepository([]);
		const userFinder = new InMemoryUserFinder([]);
		const redisService = new InmemoryRedisService();

		const handler = new CreateUserWithoutCompanyHandler(userRepository, userFinder, redisService);

		const id = 'e847261d-5539-49da-876d-bfc245e50974';
		const name = 'userName';
		const command = new CreateUserWithoutCompanyCommand(id, name);

		await handler.execute(command);
	});
});

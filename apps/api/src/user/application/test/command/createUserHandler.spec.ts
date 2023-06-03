import { CreateUserWithoutCompanyHandler } from '../../command/handler/create-user-without-company.handler'

import { InMemoryUserFinder, InMemoryUserRepository } from '../../../../test/'
import { CreateUserWithoutCompanyCommand } from '../../command/create-user-without-company.command';

describe('CreateUserHandler', () => {


    it('should creates a new user successfully', async () => {
        const userRepository = new InMemoryUserRepository([]);
        const userFinder = new InMemoryUserFinder([]);

        const handler = new CreateUserWithoutCompanyHandler(userRepository, userFinder)

        const id = 'e847261d-5539-49da-876d-bfc245e50974'
        const name = 'userName'
        const command = new CreateUserWithoutCompanyCommand(id, name)

        const result = await handler.execute(command)
    });

});

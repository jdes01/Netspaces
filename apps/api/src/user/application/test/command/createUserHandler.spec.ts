import { CreateUserHandler } from '../../command/handler/create-user.handler'

import { InMemoryUserFinder, InMemoryUserRepository } from '../../../../test/'
import { CreateUserCommand } from '../../command/create-user.command';

describe('CreateUserHandler', () => {


    it('should creates a new user successfully', async () => {
        const userRepository = new InMemoryUserRepository([]);
        const userFinder = new InMemoryUserFinder([]);

        const handler = new CreateUserHandler(userRepository, userFinder)

        const id = 'e847261d-5539-49da-876d-bfc245e50974'
        const name = 'userName'
        const command = new CreateUserCommand(id, name)

        const result = await handler.execute(command)
    });

});

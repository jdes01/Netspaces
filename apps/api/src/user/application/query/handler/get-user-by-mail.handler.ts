import { Inject } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { UserDTO } from '@netspaces/contracts';

import { UserMail } from '../../../domain/model/value-objects';
import { USER_FINDER, UserFinder } from '../../service/user-finder.service';
import { GetUserByMailQuery } from '../get-user-by-mail.query';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';

@QueryHandler(GetUserByMailQuery)
export class GetUserByMailHandler implements IQueryHandler {
    constructor(
        @Inject(USER_FINDER)
        private readonly userFinder: UserFinder,
        @Inject(WINSTON_MODULE_PROVIDER)
        private readonly logger: Logger,
    ) { }

    async execute(query: GetUserByMailQuery): Promise<UserDTO | null> {
        const user = this.userFinder.findByMail(UserMail.fromString(query.mail));
        return user
    }
}

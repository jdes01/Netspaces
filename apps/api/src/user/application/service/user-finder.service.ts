import { UserDTO } from '@netspaces/contracts';

import { UserId } from '../../domain/model/value-objects';

export const USER_FINDER = 'USER_FINDER';

export interface UserFinder {
    find(id: UserId): Promise<UserDTO | null>;
    findAll(): Promise<Array<UserDTO>>;
}

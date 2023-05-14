import { UserDTO } from '@netspaces/contracts';

import { BookingUserId } from '../../domain/model/value-objects';

export const USER_FINDER = 'USER_FINDER';

export interface UserFinder {
    find(id: BookingUserId): Promise<UserDTO | null>;
}

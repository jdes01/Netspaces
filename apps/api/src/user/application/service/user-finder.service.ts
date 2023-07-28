import { UserDTO } from '@netspaces/contracts';

import { UserId, UserMail } from '../../domain/model/value-objects';
import { UserCompanyId } from '../../domain/model/value-objects/user-company-id';

export const USER_FINDER = 'USER_FINDER';

export interface UserFinder {
  find(id: UserId): Promise<UserDTO | null>;
  findAll(): Promise<Array<UserDTO>>;
  findByCompanyId(id: UserCompanyId): Promise<Array<UserDTO>>;
  findByMail(mail: UserMail): Promise<UserDTO | null>;
}

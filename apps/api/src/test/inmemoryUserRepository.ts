import { User } from "../user/domain/model";
import { UserId } from "../user/domain/model/value-objects";
import { UserRepository } from "../user/domain/service/repository.service";

export class InMemoryUserRepository implements UserRepository<User, UserId> {
    public users: Array<User> = [];

    constructor(users: Array<User>) {
        this.users = users;
    }

    async find(id: UserId): Promise<User | null> {
        const user = this.users.find(user => user.id.equals(id));
        return user ? Promise.resolve(user) : Promise.resolve(null);
    }

    save(entity: User): void {
        const index = this.users.findIndex(user => user.id.equals(entity.id));
        if (index !== -1) {
            this.users[index] = entity;
        } else {
            this.users.push(entity);
        }
    }

    async delete(entity: User): Promise<void> {
        const index = this.users.findIndex(user => user.id.equals(entity.id));
        if (index !== -1) {
            this.users.splice(index, 1);
        }
    }
}
import { UserDTO } from "@netspaces/contracts";
import { UserFinder } from "../user/application/service/user-finder.service";
import { UserId } from "../user/domain/model/value-objects";

export class InMemoryUserFinder implements UserFinder {
    private users: UserDTO[] = []

    constructor(users: Array<UserDTO>) {
        this.users = users
    }

    async find(id: UserId): Promise<UserDTO | null> {
        const user = this.users.find(user => user._id === id.value);
        return user || null;
    }

    async findAll(): Promise<UserDTO[]> {
        return this.users;
    }

}
export interface UserRepository<T, U> {
    find(id: U): Promise<T> | null;
    save(entity: T): void;
    delete(entity: T): Promise<void>;
}
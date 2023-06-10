// @ts-nocheck

export const USER_WAS_DELETED_MESSAGE = 'USER_WAS_DELETED_MESSAGE';

export type UserWasDeletedMessage = {
    readonly _id: string;
};

export class UserWasDeletedMessageBuilder {
    static build(_id: string) {
        return { _id };
    }
}

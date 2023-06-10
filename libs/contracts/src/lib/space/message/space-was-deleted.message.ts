// @ts-nocheck

export const SPACE_WAS_DELETED_MESSAGE = 'SPACE_WAS_DELETED_MESSAGE';

export type SpaceWasDeletedMessage = {
    readonly _id: string;
};

export class SpaceWasDeletedMessageBuilder {
    static build(_id: string) {
        return { _id };
    }
}

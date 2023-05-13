// @ts-nocheck

export const SPACE_WAS_CREATED_MESSAGE = 'SPACE_WAS_CREATED_MESSAGE'

export type SpaceWasCreatedMessage = {

    readonly _id: string;
    readonly workspaceId: string;
    readonly name: string;
    readonly quantity: number;
    readonly seats: number;
    readonly amenities: Array<SpaceAmenitiesTypes>;

}

export class SpaceWasCreatedMessageBuilder {
    static build(
        _id: string,
        workspaceId: string,
        name: string,
        quantity: number,
        seats: number,
        amenities: Array<SpaceAmenitiesTypes>
    ) {
        return {
            _id,
            workspaceId,
            name,
            quantity,
            seats,
            amenities,
        }
    }
}

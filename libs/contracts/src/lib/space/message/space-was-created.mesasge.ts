// @ts-nocheck

export const SPACE_WAS_CREATED_MESSAGE = 'SPACE_WAS_CREATED_MESSAGE';

export type SpaceWasCreatedMessage = {
	readonly _id: string;
	readonly amenitys: Array<SpaceAmenitiesTypes>;
	readonly name: string;
	readonly quantity: number;
	readonly seats: number;
	readonly workspaceId: string;
};

export class SpaceWasCreatedMessageBuilder {
	static build(_id: string, workspaceId: string, name: string, quantity: number, seats: number, amenitys: Array<SpaceAmenitiesTypes>) {
		return {
			_id,
			amenitys: amenitys,
			name,
			quantity,
			seats,
			workspaceId,
		};
	}
}

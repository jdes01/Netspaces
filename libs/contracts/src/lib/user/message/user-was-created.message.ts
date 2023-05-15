// @ts-nocheck

export const USER_WAS_CREATED_MESSAGE = 'USER_WAS_CREATED_MESSAGE';

export type UserWasCreatedMessage = {
	readonly _id: string;
	readonly name: string;
};

export class UserWasCreatedMessageBuilder {
	static build(_id: string, name: string) {
		return {
			_id,
			name,
		};
	}
}

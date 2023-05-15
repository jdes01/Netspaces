// @ts-nocheck

export const WORKSPACE_WAS_CREATED_MESSAGE = 'WORKSPACE_WAS_CREATED_MESSAGE';

export type WorkspaceWasCreatedMessage = {
	readonly _id: string;
	readonly city: string;
	readonly country: string;
	readonly description: string;
	readonly name: string;
	readonly owner: string;
	readonly services: Array<string>;
	readonly street: string;
};

export class WorkspaceWasCreatedMessageBuilder {
	static build(
		_id: string,
		owner: string,
		name: string,
		description: string,
		street: string,
		city: string,
		country: string,
		services: Array<string>,
	) {
		return {
			_id,
			city,
			country,
			description,
			name,
			owner,
			services,
			street,
		};
	}
}

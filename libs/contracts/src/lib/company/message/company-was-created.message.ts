// @ts-nocheck

export const COMPANY_WAS_CREATED_MESSAGE = 'COMPANY_WAS_CREATED_MESSAGE';

export type CompanyWasCreatedMessage = {
	readonly _id: string;
	readonly name: string;
};

export class CompanyWasCreatedMessageBuilder {
	static build(_id: string, name: string) {
		return {
			_id,
			name,
		};
	}
}

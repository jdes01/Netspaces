// @ts-nocheck

export const USER_WAS_CREATED_WITH_COMPANY_MESSAGE = 'USER_WAS_CREATED_WITH_COMPANY_MESSAGE';

export type UserWasCreatedWithCompanyMessage = {
    readonly _id: string;
    readonly name: string;
    readonly companyId: string
};

export class UserWasCreatedWithCompanyMessageBuilder {
    static build(_id: string, name: string, companyId: string) {
        return {
            _id,
            name,
            companyId,
        };
    }
}

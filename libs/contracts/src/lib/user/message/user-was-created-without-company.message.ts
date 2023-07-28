// @ts-nocheck

export const USER_WAS_CREATED_WITHOUT_COMPANY_MESSAGE =
  'USER_WAS_CREATED_WITHOUT_COMPANY_MESSAGE';

export type UserWasCreatedWithoutCompanyMessage = {
  readonly _id: string;
  readonly name: string;
  readonly mail: string;
};

export class UserWasCreatedWithoutCompanyMessageBuilder {
  static build(_id: string, name: string, mail: string) {
    return {
      _id,
      name,
      mail,
    };
  }
}

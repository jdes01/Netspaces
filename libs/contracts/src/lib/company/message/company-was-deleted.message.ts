// @ts-nocheck

export const COMPANY_WAS_DELETED_MESSAGE = 'COMPANY_WAS_DELETED_MESSAGE';

export type CompanyWasDeletedMessage = {
  readonly _id: string;
};

export class CompanyWasDeletedMessageBuilder {
  static build(_id: string) {
    return { _id };
  }
}

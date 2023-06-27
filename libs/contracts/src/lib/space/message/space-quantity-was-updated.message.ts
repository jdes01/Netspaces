// @ts-nocheck

export const SPACE_QUANTITY_WAS_UPDATED_MESSAGE =
  'SPACE_QUANTITY_WAS_UPDATED_MESSAGE';

export type SpaceQuantityWasUpdatedMessage = {
  readonly _id: string;
  readonly quantity: number;
};

export class SpaceQuantityWasUpdatedMessageBuilder {
  static build(_id: string, quantity: number) {
    return {
      _id,
      quantity,
    };
  }
}

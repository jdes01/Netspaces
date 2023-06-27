import { SpaceQuantityWasUpdatedMessageProducer } from './space-quantity-was-updated.message-producer';
import { SpaceWasCreatedMessageProducer } from './space-was-created.message-producer';
import { SpaceWasDeletedMessageProducer } from './space-was-deleted.message-producer';

export const MessageProducers = [
  SpaceWasCreatedMessageProducer,
  SpaceQuantityWasUpdatedMessageProducer,
  SpaceWasDeletedMessageProducer,
];

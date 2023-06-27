import { CompanyWasCreatedMessageProducer } from './company-was-created.message-producer';
import { CompanyWasDeletedMessageProducer } from './company-was-deleted.message-producer';

export const MessageProducers = [
  CompanyWasCreatedMessageProducer,
  CompanyWasDeletedMessageProducer,
];

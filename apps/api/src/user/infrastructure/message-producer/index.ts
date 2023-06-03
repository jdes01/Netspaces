import { UserWasCreatedWithCompanyMessageProducer } from './user-was-created-with-company.message-producer';
import { UserWasCreatedWithoutCompanyMessageProducer } from './user-was-created-without-company.message-producer';

export const MessageProducers = [UserWasCreatedWithoutCompanyMessageProducer, UserWasCreatedWithCompanyMessageProducer];

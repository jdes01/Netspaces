import { Controller, Inject } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';
import { InjectModel } from '@nestjs/mongoose';
import {
  SPACE_QUANTITY_WAS_UPDATED_MESSAGE,
  SpaceQuantityWasUpdatedMessage,
} from '@netspaces/contracts';
import { Model } from 'mongoose';

import { SPACE_PROJECTION, SpaceDocument } from '../schema/space.schema';

import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';

@Controller()
export class SpaceQuantityWasUpdatedProjection {
  constructor(
    @InjectModel(SPACE_PROJECTION)
    private readonly spaceProjection: Model<SpaceDocument>,
    @Inject(WINSTON_MODULE_PROVIDER)
    private readonly logger: Logger,
  ) {}

  @EventPattern(SPACE_QUANTITY_WAS_UPDATED_MESSAGE)
  async handle(message: SpaceQuantityWasUpdatedMessage) {
    this.spaceProjection
      .findByIdAndUpdate(message._id, {
        quantity: message.quantity,
      })
      .exec();

    this.logger.info('Space quantity was updated', {
      spaceId: message._id,
      spaceQuantity: message.quantity,
    });
  }
}

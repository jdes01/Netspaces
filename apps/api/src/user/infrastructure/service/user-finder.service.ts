import { Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { UserDTO } from '@netspaces/contracts';
import { Model } from 'mongoose';

import { UserFinder } from '../../application/service/user-finder.service';
import { UserId, UserMail } from '../../domain/model/value-objects';
import { USER_PROJECTION, UserDocument } from '../projection';
import { UserCompanyId } from '../../domain/model/value-objects/user-company-id';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';


@Injectable()
export class MongoDBUserFinder implements UserFinder {
  constructor(
    @InjectModel(USER_PROJECTION)
    private readonly userProjection: Model<UserDocument>,
    @Inject(WINSTON_MODULE_PROVIDER)
    private readonly logger: Logger,
  ) { }

  findAll(): Promise<UserDTO[]> {
    return this.userProjection.find().exec();
  }

  find(id: UserId): Promise<UserDTO | null> {
    return this.userProjection.findById(id.value).exec();
  }

  findByCompanyId(id: UserCompanyId): Promise<UserDTO[]> {
    return this.userProjection.find({ companyId: id.value }).exec();
  }

  findByMail(mail: UserMail): Promise<UserDTO | null> {
    const user = this.userProjection.findOne({ mail: mail.value }).exec();
    this.logger.info('mail', { user: user });
    return user
  }
}

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { UserDTO } from '@netspaces/contracts';
import { Model } from 'mongoose';

import { UserFinder } from '../../application/service/user-finder.service';
import { BookingUserId } from '../../domain/model/value-objects';
import { USER_PROJECTION, UserDocument } from '../projection/schema/user.schema';

@Injectable()
export class MongoDBUserFinder implements UserFinder {
    constructor(
        @InjectModel(USER_PROJECTION)
        private readonly userProjection: Model<UserDocument>,
    ) { }

    find(id: BookingUserId): Promise<UserDTO | null> {
        return this.userProjection.findById(id.value).exec();
    }

}

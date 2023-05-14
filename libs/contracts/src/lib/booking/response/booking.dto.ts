// @ts-nocheck

import { ApiProperty } from '@nestjs/swagger';
import { SerializedDate } from '../../../../../domain/src/lib/serialized-date';


export class BookingDTO {
    @ApiProperty()
    readonly _id: string;

    @ApiProperty()
    readonly userId: string;

    @ApiProperty()
    readonly workspaceId: string;

    @ApiProperty()
    readonly spaceId: string;

    @ApiProperty()
    readonly date: SerializedDate;

}

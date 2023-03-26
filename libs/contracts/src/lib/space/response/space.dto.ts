import { ApiProperty } from '@nestjs/swagger';

export class SpaceDTO {
    @ApiProperty()
    readonly _id: string;
}

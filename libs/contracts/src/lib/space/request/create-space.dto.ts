import { ApiProperty } from "@nestjs/swagger";
import { SpaceAmenitiesTypes } from "@netspaces/domain";
import { IsNotEmpty, IsUUID } from "class-validator";

export class CreateSpaceDTO {
    @ApiProperty()
    @IsNotEmpty()
    @IsUUID()
    readonly _id: string;


    @ApiProperty()
    @IsNotEmpty()
    @IsUUID()
    readonly workspaceId: string;


    @ApiProperty()
    @IsNotEmpty()
    readonly name: string;


    @ApiProperty()
    @IsNotEmpty()
    readonly quantity: number;


    @ApiProperty()
    @IsNotEmpty()
    readonly seats: number;

    @ApiProperty()
    @IsNotEmpty()
    readonly amenities: Array<SpaceAmenitiesTypes>;
};

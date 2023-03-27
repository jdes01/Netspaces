import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsUUID } from "class-validator";


export class CreateSpaceDTO {
    @ApiProperty()
    @IsNotEmpty()
    @IsUUID()
    readonly _id: string;


    @ApiProperty()
    @IsNotEmpty()
    readonly quantity: number;
};

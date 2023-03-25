import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsNotEmpty, IsString, IsUUID } from "class-validator";

export enum WorkspaceService {
    WIFI = "WIFI",
    KITCHEN = "KITCHEN",
    COFFEE = "COFFEE",
    PRINTER = "PRINTER",
    PARKING = "PARKING",
}


export class CreateWorkspaceDTO {
    @ApiProperty()
    @IsNotEmpty()
    @IsUUID()
    readonly _id: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    readonly name: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    readonly description: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    readonly street: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    readonly city: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    readonly country: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsArray()
    readonly services: Array<WorkspaceService>;
};

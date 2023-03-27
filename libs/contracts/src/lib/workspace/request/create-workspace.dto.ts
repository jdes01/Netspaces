import { ApiProperty } from "@nestjs/swagger";
import { WorkspaceServicesTypes } from "@netspaces/domain";
import { IsArray, IsNotEmpty, IsString, IsUUID } from "class-validator";


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
    readonly services: Array<WorkspaceServicesTypes>;
};

import { IRelatedValue } from "../interfaces/irelated-value.interface";
import { IValue } from "../../values/interfaces/ivalue.interface";
import { IsInt, IsBoolean, IsInstance } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { Value } from "../../values/entities/value.entity";

export class GetRelatedValueDto implements IRelatedValue {
    @IsInt()
    @ApiProperty({ example: '1', description: 'The id of the Related Value' })
    readonly id: number;

    @IsBoolean()
    @ApiProperty({ example: true, description: "Define if the Related Value is actived"})
    isActive: boolean;

    @IsInstance(Value)
    value: IValue;
}

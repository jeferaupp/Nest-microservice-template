import { IRelatedValue } from "../interfaces/irelated-value.interface";
import { IValue } from "../../values/interfaces/ivalue.interface";
import { IsInt, IsBoolean, IsInstance } from "class-validator";
import { ApiProperty, ApiPropertyOptional, ApiHideProperty } from "@nestjs/swagger";
import { Value } from "../../values/entities/value.entity";

export class UpdateRelatedValueDto implements IRelatedValue {
    @IsInt()
    @ApiHideProperty()
    id: number;

    @IsBoolean()
    @ApiPropertyOptional({ example: true, description: "Define if the Related Value is actived"})
    isActive: boolean;

    @IsInstance(Value)
    @ApiHideProperty()
    value: IValue;
}

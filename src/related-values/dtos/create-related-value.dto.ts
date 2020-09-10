import { IRelatedValue } from "../interfaces/irelated-value.interface";
import { IsInt, IsBoolean, IsInstance } from "class-validator";
import { ApiProperty, ApiHideProperty } from "@nestjs/swagger";
import { Value } from "../../values/entities/value.entity";
import { IValue } from "../../values/interfaces/ivalue.interface";

export class CreateRelatedValueDto implements IRelatedValue {
    @IsInt()
    @ApiHideProperty()
    readonly id: number;

    @IsBoolean()
    @ApiProperty({ examples: [ true, false ], description: "Define if the Related Value is actived"})
    isActive: boolean;

    @IsInstance(Value)
    @ApiHideProperty()
    value: IValue;
}

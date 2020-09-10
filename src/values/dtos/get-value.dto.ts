import { IValue } from "../interfaces/ivalue.interface";
import { IsInt, IsString, IsInstance } from "class-validator";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IRelatedValue } from "../../related-values/interfaces/irelated-value.interface";
import { RelatedValueEntity } from "../../related-values/entities/related-value.entity";
import { GetRelatedValueDto } from "../../related-values/dtos/get-related-value.dto";

export class GetValueDto implements IValue {
    @IsInt()
    @ApiProperty({ example: '1', description: 'The id of the Value' })
    readonly id: number;
    
    @IsString()
    @ApiProperty({ example: 'John Doe', description: 'The name of the Value' })
    readonly name: string;
    
    @IsInstance(RelatedValueEntity)
    @ApiPropertyOptional({examples: [{isActive: true}], description: 'The relationated values.', type: GetRelatedValueDto})
    readonly relatedValues: IRelatedValue[];
}

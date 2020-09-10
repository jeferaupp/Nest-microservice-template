import { IsInt, IsString } from 'class-validator';
import { ApiProperty, ApiHideProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IValue } from '../interfaces/ivalue.interface';
import { IRelatedValue } from '../../related-values/interfaces/irelated-value.interface';
import { CreateRelatedValueDto } from './../../related-values/dtos/create-related-value.dto';
export class CreateValueDto implements IValue {
    @IsInt()
    @ApiHideProperty()
    readonly id: number;

    @IsString()
    @ApiProperty({ example: 'John Doe', description: 'The name of the Value' })
    readonly name:string;
    
    @ApiPropertyOptional({ example: [{ isActive: true }], description: 'List of related values', type: CreateRelatedValueDto })
    readonly relatedValues: IRelatedValue[];
}

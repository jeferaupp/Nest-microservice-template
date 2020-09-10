import { IsInt, IsString, IsInstance } from 'class-validator';
import { ApiProperty, ApiHideProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IValue } from '../interfaces/ivalue.interface';
import { IRelatedValue } from '../../related-values/interfaces/irelated-value.interface';
import { UpdateRelatedValueDto } from '../../related-values/dtos/update-related-value.dto';
export class UpdateValueDto implements IValue {
    @IsInt()
    @ApiHideProperty()
    id: number;
    
    @IsString()
    @ApiPropertyOptional({ example: 'John Doe', description: 'The name of the Value' })
    readonly name:string;
    
    @IsInstance(UpdateRelatedValueDto)
    @ApiPropertyOptional({ type:  UpdateRelatedValueDto})
    readonly relatedValues: IRelatedValue[];
}

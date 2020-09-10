import { Controller, Post, Body, HttpStatus, Get, Param, ParseIntPipe, HttpException, Patch, Delete } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { RelatedValuesService } from '../services/related-values.service';
import { CreateRelatedValueDto } from '../dtos/create-related-value.dto';
import { IRelatedValue } from '../interfaces/irelated-value.interface';
import { GetRelatedValueDto } from '../dtos/get-related-value.dto';
import { UpdateRelatedValueDto } from '../dtos/update-related-value.dto';

@ApiTags('related-values')
@Controller('related-values')
export class RelatedValuesController {
    constructor(private readonly relatedValuesService:RelatedValuesService) {}

    @Post()
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Create a new related value' })
    @ApiResponse({ status: 201, description: 'Related value created.' })
    @ApiResponse({ status: 403, description: 'Forbidden.' })
    async create(@Body() createRelatedValueDto: CreateRelatedValueDto): Promise<IRelatedValue> {
        return this.relatedValuesService.create(createRelatedValueDto);
    }

    @Get()
    @ApiOperation({ summary: 'Get all values' })
    @ApiResponse({ status: 200, description: 'Related values listed.', type: [GetRelatedValueDto] })
    @ApiResponse({ status: 403, description: 'Forbidden.' })
    async findAll(): Promise<IRelatedValue[]> {
        return this.relatedValuesService.findAll();
    }

    @Get(':id')
    @ApiOperation({ summary: 'Get a value by id' })
    @ApiResponse({ status: HttpStatus.OK, description: 'Related value found.', type: GetRelatedValueDto })
    @ApiResponse({ status: HttpStatus.FORBIDDEN, description: 'Forbidden.' })
    @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Related value not found.' })
    async findOne(
        @Param('id', new ParseIntPipe())
        id: number,
    ): Promise<IRelatedValue> {
        const value = await this.relatedValuesService.find(id);

        if (!value) {
            throw new HttpException('Ops... This Related Value was not found! :(', HttpStatus.NOT_FOUND);
        }

        return value;
    }

    @Patch(':id')
    @ApiOperation({ summary: 'Update a related vvalue' })
    @ApiResponse({ status: HttpStatus.OK, description: 'Related value updated.', type: GetRelatedValueDto })
    @ApiResponse({ status: HttpStatus.FORBIDDEN, description: 'Forbidden.' })
    @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'BadRequest.' })
    async update(
        @Param('id', new ParseIntPipe())
        id: number,
        @Body() updateValueDto: UpdateRelatedValueDto
    ): Promise<IRelatedValue> {
        const updateValue = {...updateValueDto}
        updateValue.id = id;
        const value = this.relatedValuesService.update(updateValue);

        if (!value) {
            throw new HttpException('Ops... Not was possible update this related value! :(', HttpStatus.BAD_REQUEST);
        }

        return value;
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Delete a related value' })
    @ApiResponse({ status: HttpStatus.OK, description: 'Related value deleted.'})
    @ApiResponse({ status: HttpStatus.FORBIDDEN, description: 'Forbidden.' })
    @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'BadRequest.' })
    async delete(
        @Param('id', new ParseIntPipe())
        id: number
    ): Promise<void> {
        return await this.relatedValuesService.remove(id);
    }
}

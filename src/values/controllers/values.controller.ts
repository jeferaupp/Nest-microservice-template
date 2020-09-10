import { Controller, Post, Body, Get, Param, ParseIntPipe, NotFoundException, HttpException, HttpStatus, Patch, Delete } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags, ApiResponse, ApiBasicAuth } from '@nestjs/swagger';
import { ValuesService } from '../services/values.service';
import { CreateValueDto } from '../dtos/create-value.dto';
import { IValue } from '../interfaces/ivalue.interface';
import { GetValueDto } from '../dtos/get-value.dto';
import { UpdateValueDto } from '../dtos/update-value.dto';

@ApiTags('values')
@Controller('values')
export class ValuesController {
    constructor(private readonly valuesService: ValuesService) { }

    @Post()
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Create a new value' })
    @ApiResponse({ status: 201, description: 'Value created.' })
    @ApiResponse({ status: 403, description: 'Forbidden.' })
    async create(@Body() createValueDto: CreateValueDto): Promise<IValue> {
        return this.valuesService.create(createValueDto);
    }

    @Get()
    @ApiOperation({ summary: 'Get all values' })
    @ApiResponse({ status: 200, description: 'Values listed.', type: [GetValueDto] })
    @ApiResponse({ status: 403, description: 'Forbidden.' })
    async findAll(): Promise<IValue[]> {
        return this.valuesService.findAll();
    }

    @Get(':id')
    @ApiOperation({ summary: 'Get a value by id' })
    @ApiResponse({ status: HttpStatus.OK, description: 'Value found.', type: GetValueDto })
    @ApiResponse({ status: HttpStatus.FORBIDDEN, description: 'Forbidden.' })
    @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Value not found.' })
    async findOne(
        @Param('id', new ParseIntPipe())
        id: number,
    ): Promise<IValue> {
        const value = await this.valuesService.find(id);

        if (!value) {
            throw new HttpException('Ops... This Value was not found! :(', HttpStatus.NOT_FOUND);
        }

        return value;
    }

    @Patch(':id')
    @ApiOperation({ summary: 'Update a value' })
    @ApiResponse({ status: HttpStatus.OK, description: 'Value updated.', type: GetValueDto })
    @ApiResponse({ status: HttpStatus.FORBIDDEN, description: 'Forbidden.' })
    @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'BadRequest.' })
    async update(
        @Param('id', new ParseIntPipe())
        id: number,
        @Body() updateValueDto: UpdateValueDto
    ): Promise<IValue> {
        const updateValue = {...updateValueDto}
        updateValue.id = id;
        const value = this.valuesService.update(updateValue);

        if (!value) {
            throw new HttpException('Ops... Not was possible update this value! :(', HttpStatus.BAD_REQUEST);
        }

        return value;
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Delete a value' })
    @ApiResponse({ status: HttpStatus.OK, description: 'Value deleted.' })
    @ApiResponse({ status: HttpStatus.FORBIDDEN, description: 'Forbidden.' })
    @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'BadRequest.' })
    async delete(
        @Param('id', new ParseIntPipe())
        id: number
    ): Promise<void> {
        return await this.valuesService.remove(id);
    }
}

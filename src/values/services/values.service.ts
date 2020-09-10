import { Injectable } from '@nestjs/common';
import { IValue } from '../interfaces/ivalue.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Value } from '../entities/value.entity';

@Injectable()
export class ValuesService {
    constructor(
        @InjectRepository(Value)
        private readonly valuesReposiroty: Repository<IValue>
    ) {}

    async create(value:IValue): Promise<IValue> {
        return this.valuesReposiroty.save(value);
    }

    async findAll(): Promise<IValue[]> {
        return this.valuesReposiroty.find({ relations: ["relatedValues"] });
    }

    async find(id: number): Promise<IValue> {
        return await this.valuesReposiroty.findOne(id, { relations: ["relatedValues"] });
    }

    async update(value:IValue): Promise<IValue> {
        await this.valuesReposiroty.update(
            { id: value.id },
            value
        );

        return this.find(value.id);
    }

    async remove(id: number): Promise<void> {
      this.valuesReposiroty.delete(id);
    }
}

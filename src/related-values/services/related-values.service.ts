import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RelatedValueEntity } from '../entities/related-value.entity';
import { Repository } from 'typeorm';
import { IRelatedValue } from '../interfaces/irelated-value.interface';

@Injectable()
export class RelatedValuesService {
    constructor(
        @InjectRepository(RelatedValueEntity)
        private readonly relatedValuesRepository: Repository<IRelatedValue>
    ) {}

    async create(relatedValue:IRelatedValue): Promise<IRelatedValue> {
        return this.relatedValuesRepository.save(relatedValue);
    }

    async findAll(): Promise<IRelatedValue[]> {
        return this.relatedValuesRepository.find({ relations: ["value"] });
    }

    async find(id: number): Promise<IRelatedValue> {
        return await this.relatedValuesRepository.findOne(id, { relations: ["value"] });
    }

    async update(value:IRelatedValue): Promise<IRelatedValue> {
        await this.relatedValuesRepository.update(
            { id: value.id },
            value
        );

        return this.find(value.id);
    }

    async remove(id: number): Promise<void> {
      this.relatedValuesRepository.delete(id);
    }
}

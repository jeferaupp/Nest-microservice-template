import { PrimaryGeneratedColumn, Column, Entity, OneToMany } from 'typeorm';
import { IValue } from '../interfaces/ivalue.interface';
import { IRelatedValue } from '../../related-values/interfaces/irelated-value.interface';
import { RelatedValueEntity } from '../../related-values/entities/related-value.entity';

@Entity()
export class Value implements IValue {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column()
    name: string;

    @OneToMany(type => RelatedValueEntity, relatedValue => relatedValue.value, { cascade: ['insert'] })
    relatedValues: IRelatedValue[];
}

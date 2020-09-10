import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { IValue } from "../../values/interfaces/ivalue.interface";
import { Value } from "../../values/entities/value.entity";
import { IRelatedValue } from "../interfaces/irelated-value.interface";


@Entity()
export class RelatedValueEntity implements IRelatedValue {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column({ default: false })
    isActive: boolean;

    @ManyToOne(type => Value, value => value.relatedValues)
    value: IValue;
}


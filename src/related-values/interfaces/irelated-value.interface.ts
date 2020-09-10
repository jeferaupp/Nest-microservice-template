import { IValue } from "../../values/interfaces/ivalue.interface";

export interface IRelatedValue {
    readonly id: number;
    readonly isActive: boolean;
    readonly value: IValue;
}




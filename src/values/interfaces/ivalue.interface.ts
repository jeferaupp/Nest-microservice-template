import { IRelatedValue } from "../../related-values/interfaces/irelated-value.interface";

export interface IValue {
    id: number;
    readonly name: string;
    readonly relatedValues: IRelatedValue[]
}

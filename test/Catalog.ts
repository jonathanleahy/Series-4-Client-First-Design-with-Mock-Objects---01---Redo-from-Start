import {Price} from "./Price";

export interface Catalog {
    findPrice(barcode: string): Price
}
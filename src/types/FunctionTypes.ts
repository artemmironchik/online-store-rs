import { IProduct } from "../models/IProduct";

export type SortFunction = (a: IProduct, b: IProduct) => number;

export type FilterFunction = (a: IProduct) => boolean
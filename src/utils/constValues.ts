import { IProduct } from "../models/IProduct"
import { SortFunction } from "../types/FunctionTypes"

export const SORTINGS: Record<string, SortFunction> = {
  'price / asc': (p1: IProduct, p2: IProduct) => p1.price - p2.price,
  'price / desc': (p1: IProduct, p2: IProduct) => p2.price - p1.price,
  'rating / desc': (p1: IProduct, p2: IProduct) => p2.rating.rate - p1.rating.rate,
}

export const FILTERS = {
  includes: (set: Set<string>, field: string) => (o: IProduct) => set.has(<string>o[field]),
  range: (min: number, max: number, field: string) => (o: IProduct) => o[field] >= min && o[field] <= max,
  stock: (min: number, max: number, field: string) => (o: IProduct) => o['rating'][field] >= min && o['rating'][field] <= max,
  search: (search: string, field: string) => (o: IProduct) => (<string>o[field]).toLowerCase().includes(search.toLowerCase()),
}
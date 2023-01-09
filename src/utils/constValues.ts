import { IProduct } from "../models/IProduct"

export const SORTINGS = {
  'price / asc': () => (p1: IProduct, p2: IProduct) => p1.price - p2.price,
  'price / desc': () => (p1: IProduct, p2: IProduct) => p2.price - p1.price,
  'rating / desc': () => (p1: IProduct, p2: IProduct) => p2.rating.rate - p1.rating.rate,
}

export const FILTERS = {
  includes: (set: Set<string>, field: string) => (o: IProduct) => set.has(<string>o[field]),
  range: (min: number, max: number, field: string) => (o: IProduct) => o[field] >= min && o[field] <= max,
  search: (search: string, field: string) => (o: IProduct) => (<string>o[field]).toLowerCase().includes(search.toLowerCase()),
}
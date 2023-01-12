import { createContext } from 'react'
import { IProduct } from '../models/IProduct'

export interface ProductsContextProps {
  products: IProduct[];
  loading: boolean;
  error: string;
  totalPrice: number;
  setPrice: (value: number) => void
}

export const ProductsContext = createContext<ProductsContextProps | null>(null)
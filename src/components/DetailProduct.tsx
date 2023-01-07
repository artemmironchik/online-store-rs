import React from 'react'
import { IProduct } from '../models/IProduct'

interface ProductProps {
    product: IProduct
}

export function DetailProduct({product}: ProductProps) {
  return (
    <div className="border py-2 px-4 rounded flex flex-col items-center mb-2">
        <img src={product.image} className="w-16" alt={product.title}/>
        <p>{product.title}</p>
        <span className='font-bold'>Price: {product.price}</span>
        <p>Category: {product.category}</p>
        <p>Rate: {product.rating.rate}</p>
        <p>Count: {product.rating.count}</p>
    </div>
  )
}

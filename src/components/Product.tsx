import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { IProduct } from '../models/IProduct'

interface ProductProps {
    product: IProduct
}

export function Product({product}: ProductProps) {
  return (
    <Link to={`/details/${product.id}`}>
        <div className="border py-2 px-4 rounded flex flex-col items-center mb-2">
        <img src={product.image} className="w-16" alt={product.title}/>
        <p>{product.title}</p>
        <span className='font-bold'>{product.price}</span>
        </div>
    </Link>
  )
}

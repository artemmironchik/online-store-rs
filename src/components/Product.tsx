import React, { useState } from 'react'
import { IProduct } from '../models/IProduct'

interface ProductProps {
    product: IProduct
}

export function Product({product}: ProductProps) {
    const [details, setDetails] = useState(false);

    const btnbg = details ? 'bg-yellow-400' : 'bg-blue-400'

    const btnClasses = ['py-2 px-4 border', btnbg]

  return (
    <div className="border py-2 px-4 rounded flex flex-col items-center mb-2">
        <img src={product.image} className="w-16" alt={product.title}/>
        <p>{product.title}</p>
        <span className='font-bold'>{product.price}</span>
        <button className={btnClasses.join(' ')}
        onClick={() => setDetails(prev => !prev)}
        >
        {details ? 'Hide details' : 'Show details'}
        </button>

       {details && <div>
            <p>{product.description}</p>
            <p>Rate: <span>{product.rating.rate}</span></p>
        </div>}
    </div>
  )
}

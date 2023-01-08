import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { IProduct } from '../models/IProduct'

interface ProductProps {
    product: IProduct
}

export function DetailProduct({product}: ProductProps) {

    const [add, setAdd] = useState<Boolean>(false);

    let productsID = JSON.parse(localStorage.getItem("ProductsId") || "[]");

    useEffect(() => {
        productsID.includes(product.id) ? setAdd(true) : setAdd(false);
    })

    const btnClassName = add ? 'bg-yellow-400' : 'bg-blue-400';
    const btnClasses = ['border w-full flex items-center justify-items-center justify-center py-2 rounded', btnClassName];


    const handleClick = () => {
        setAdd(prev => !prev);
        if(!productsID.includes(product.id)) {
            productsID.push(product.id);
            localStorage.setItem("ProductsId", JSON.stringify(productsID));
        } else {
            productsID = productsID.filter((elem: number) => elem !== product.id)
            localStorage.setItem("ProductsId", JSON.stringify(productsID));
        }
    }

  return (
    <div className="grid grid-cols-3 gap-4">
        <img src={product.image} className="w-3/5 m-auto" alt={product.title}/>
            <div className="flex flex-col items-center justify-center">
                <p>{product.title}</p>
                <span className='font-bold'>Price: {product.price} $</span>
                <p>Category: {product.category}</p>
                <p>Rate: {product.rating.rate}</p> 
            </div>
            <div className="flex flex-col items-center justify-center">
                <button onClick={handleClick} 
                    className={btnClasses.join(' ')}
                    > {add ? 'DROP FROM CART' : 'ADD TO CART' }
                </button>
                <button
                    className="border w-full flex items-center justify-items-center justify-center my-4 py-2 bg-blue-400 rounded"
                    >BUY NOW
                </button>
            </div>
            <p className='col-span-3 text-center'>{product.description}</p>
    </div>
  )
}

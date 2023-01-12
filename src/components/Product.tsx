import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { IProduct } from '../models/IProduct'

interface ProductProps {
    product: IProduct,
    isBasket: boolean
}

export function Product({product, isBasket}: ProductProps,) {

    let productsID: number[] | null = JSON.parse(localStorage.getItem("ProductsId") || "[]");

    const totalCount = getCountProduct() ? getCountProduct() : 1;
    const [count, setCount] = useState<number>(totalCount);

    const handleAddClick = () => {
        getCountProduct()
        let productsID: number[] | null = JSON.parse(localStorage.getItem("ProductsId") || "[]");
        if(productsID) {
            if(count >= product.rating.count) {
                alert(`You can't add more than ${product.rating.count} product`)
            } else {
                setCount(count + 1);
                productsID.push(product.id);
            }
        }
        localStorage.setItem("ProductsId", JSON.stringify(productsID));
    }

    function getCountProduct() {
        let productsID: number[] | null = JSON.parse(localStorage.getItem("ProductsId") || "[]");
        const counts: {[index: number]: number} = {};
        if(productsID) {
            productsID.forEach(function(x) { counts[x] = (counts[x] || 0) + 1; });
        }
        return counts[product.id];
    }

    const handleDeleteClick = () => {
        if(count === 1) {
            if(productsID)
            productsID = productsID.filter((elem: number) => elem !== product.id)
            localStorage.setItem("ProductsId", JSON.stringify(productsID));
        } else {
            setCount(count - 1);
            if(productsID)
            productsID.pop();
            localStorage.setItem("ProductsId", JSON.stringify(productsID));
        }
    }

  return (
    <>
        {!isBasket && <div className="py-2 px-4 rounded flex flex-col items-center mb-2 justify-between">
        <Link to={`/details/${product.id}`}><img src={product.image} className="w-16" alt={product.title}/></Link>
                <p>{product.title}</p>
                <span className='font-bold'>{product.price} $</span>
                <div className='flex justify-between w-full'><button onClick={handleAddClick} className='rounded'>{count === 1 ? 'Add' : count}</button>
                <Link to={`/details/${product.id}`}><button className='rounded' >Detail</button></Link></div>
            </div>}
        {isBasket && <div className="grid grid-cols-6 mb-3 items-center rounded border py-5 px-5 m-auto">
        <Link to={`/details/${product.id}`}><img src={product.image} className="w-16" alt={product.title}/></Link> 
        <div className='col-span-4'>
            <p className='text-base border-b-2'>{product.title}</p>
            <p>Number of products in stock: {product.rating.count}</p>
            <p className='text-xs'>{product.description}</p>
        </div>
          <div className="flex flex-col items-center">
          <span className='font-bold text-base'>{(product.price * count).toFixed(2)} $</span>
            <div className="flex justify-around w-4/5">
                <button onClick={handleAddClick} className="px-1 py-1 border rounded text-base w-10">
                   {count === 1 ? 'Add' : count} 
                </button>
                <button onClick={handleDeleteClick} className="px-1 py-1 border rounded text-base">Delete</button>
            </div>
          </div>
        </div>}
    </>
  )
}

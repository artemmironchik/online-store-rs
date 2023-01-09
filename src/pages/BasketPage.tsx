import React, { useEffect, useState } from 'react'
import { Loader } from '../components/Loader';
import { Error } from '../components/Error';
import { useProducts } from '../hooks/products';
import { Product } from '../components/Product';
import { IProduct } from '../models/IProduct';
import { Empty } from '../components/Empty';

export function BasketPage() {
  
    const {loading, error, products} = useProducts();
    let productsID: number[] = JSON.parse(localStorage.getItem("ProductsId") || "[]");
    const basketProducts = products.filter((product) => productsID.includes(product.id))
    const totalPrice = basketProducts.reduce((acc, curr) => acc += curr.price, 0);

    const [state, setState] = useState<number>(0);
    const [price, setPrice] = useState<number>(totalPrice);
    
    useEffect(() => {
        setPrice(totalPrice)
    },[])

    useEffect(() => {
        const totalIdProducts: number[] = JSON.parse(localStorage.getItem("ProductsId") || "[]");
        const totalProducts: IProduct[]  = [];
        totalIdProducts.forEach((id: number) => {
            products.forEach((product) => {
                if(product.id === id) {
                    totalProducts.push(product)
                }
            })
        })
        const totalPriceArr = totalProducts.map((product) => product.price);
        const totalPrice = totalPriceArr.reduce((acc, curr) => acc += curr, 0);
        setPrice(totalPrice)
    }, [state])

    const handleClick = () => {
        setState(state => state + 1);
    }

    return (
      <div className="container m-auto px-5 py-5">
        {loading && <Loader/>}
        {error && <Error error={error}/>}
        <div onClick={handleClick}>
            <p className = "text-center mb-5 totalPrice">Total price: {price === 0 ? totalPrice.toFixed(2) : price.toFixed(2)} $</p>
            {totalPrice === 0 ? <Empty/> :
                basketProducts.map(product => <Product product={product} isBasket={true} key={product.id} />)}
        </div>
      </div>
    );
}
import React, { useEffect, useState, useContext } from 'react'
import { Loader } from '../components/Loader';
import { Error } from '../components/Error';
import { Product } from '../components/Product';
import { IProduct } from '../models/IProduct';
import { Empty } from '../components/Empty';
import { ProductsContext } from '../contexts/ProductsContext'
import { ProductsContextProps } from '../contexts/ProductsContext';
import { Summary } from '../components/Summary';

export function BasketPage() {
  
    const {loading, error, products} = useContext(ProductsContext) as ProductsContextProps;
    let productsID: number[] = JSON.parse(localStorage.getItem("ProductsId") || "[]");
    const basketProducts = products.filter((product) => productsID.includes(product.id))

    const [state, setState] = useState<number>(0);
    const [price, setPrice] = useState<number>(getTotalPrice());
    const [count, setCount] = useState(getCount());

    useEffect(() => {
        setPrice(getTotalPrice())
    },[])

    function getTotalPrice() {
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
        return totalPrice;
    }

    function getCount() {
        const totalIdProducts: number[] = JSON.parse(localStorage.getItem("ProductsId") || "[]");
        return totalIdProducts.length;
    }

    useEffect(() => {
        setPrice(getTotalPrice())
        setCount(getCount())
    }, [state])

    const handleClick = () => {
        setState(state => state + 1);
    }

    return (
      <div className="container m-auto px-5 py-5 flex">
        {loading && <Loader/>}
        {error && <Error error={error}/>}
        <div className="m-auto" onClick={handleClick}>
            <p className = "text-center mb-5 totalPrice">Total price: {price === 0 ? getTotalPrice().toFixed(2) : price.toFixed(2)} $</p>
            {getTotalPrice() === 0 ? <Empty/> :
                basketProducts.map(product => <Product product={product} isBasket={true} key={product.id} />)}
        </div>
        {getTotalPrice() !== 0 && <Summary count={count} totalPrice={+price === 0 ? +getTotalPrice().toFixed(2) : +price.toFixed(2)} />}
      </div>
    );
}
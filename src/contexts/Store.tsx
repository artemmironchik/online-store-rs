import React, { ReactNode, useState, useEffect } from 'react'
import { ProductsContext } from './ProductsContext'
import { IProduct } from "../models/IProduct";
import axios, { AxiosError } from 'axios'

function Store({ children } : { children: ReactNode}) {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [totalPrice, setPrice] = useState<number>(0);

  async function fetchProducts() {
    try {
      const response = await axios.get<IProduct[]>(
        "https://fakestoreapi.com/products"
      );
      setProducts(response.data);
      setLoading(false);
    } catch (e: unknown) {
      const error = e as AxiosError;
      setLoading(false);
      setError(error.message);
    }
  }

  function getTotalPrice(allProducts: any[]) {
    const totalIdProducts: number[] = JSON.parse(localStorage.getItem("ProductsId") || "[]");
    const totalProducts: IProduct[]  = [];
    totalIdProducts.forEach((id: number) => {
      allProducts.forEach((product) => {
            if(product.id === id) {
                totalProducts.push(product)
            }
        })
    })
    const totalPriceArr = totalProducts.map((product) => product.price);
    const totalPrice = totalPriceArr.reduce((acc, curr) => acc += curr, 0);  
    return totalPrice;
}

function setTotalPrice(allProducts: any[]) {
  const price = getTotalPrice(allProducts)
  setPrice(price)
}

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    setTotalPrice(products);
  }, [products]);

  return (
    <ProductsContext.Provider value={{products, loading, error, totalPrice, setPrice}}>
      {children}
    </ProductsContext.Provider>
  )
}

export default Store
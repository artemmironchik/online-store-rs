import React, { useEffect, useState } from 'react'
import { Loader } from '../components/Loader';
import { Error } from '../components/Error';
import { useProducts } from '../hooks/products';
import { Product } from '../components/Product';

export function BasketPage() {
  
    const {loading, error, products} = useProducts();
    let productsID = JSON.parse(localStorage.getItem("ProductsId") || "[]");
    const basketProducts = products.filter((product) => productsID.includes(product.id))

    const [allBasletProducts, setAllBasketProducts] = useState(basketProducts);

    return (
    
      <div className="container m-auto px-5 py-5">
        {loading && <Loader/>}
        {error && <Error error={error}/>}
        {basketProducts.map(product => <Product product={product} isBasket={true} key={product.id} />)}
      </div>
    );
}
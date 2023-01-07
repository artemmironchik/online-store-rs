import React from 'react'
import { Loader } from '../components/Loader';
import { Error } from '../components/Error';
import { useProducts } from '../hooks/products';
import { Product } from '../components/Product';

export function ProductsPage() {
  
    const {loading, error, products} = useProducts();

    return (
      <div className="container pt-5 mx-auto">
        {loading && <Loader/>}
        {error && <Error error={error}/>}
        {products.map(product => <Product product={product} key={product.id} />)}
      </div>
    );
}

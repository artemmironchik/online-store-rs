import React from 'react'
import { DetailProduct } from '../components/DetailProduct';
import { Loader } from '../components/Loader';
import { Error } from '../components/Error';
import { useProduct } from '../hooks/product';

export function DetailPage() {
  
  const {loading, error, product} = useProduct();

  return (
    <div className="container pt-5 mx-auto">
        {loading && <Loader/>}
        {error && <Error error={error}/>}
        {product && <DetailProduct product={product} key={product.id} />}
      </div>
  )
}

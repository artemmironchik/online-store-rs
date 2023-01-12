import React from 'react'
import { DetailProduct } from '../components/DetailProduct';
import { Loader } from '../components/Loader';
import { Error } from '../components/Error';
import { useProduct } from '../hooks/product';

export function DetailPage() {
  
  const {loading, error, product} = useProduct();

  return (
    <div className="container mx-auto mb-[5%] px-5 py-5">
        {loading && <Loader/>}
        {error && <Error error={error}/>}
        {product && <DetailProduct product={product} key={product.id} />}
    </div>
  )
}

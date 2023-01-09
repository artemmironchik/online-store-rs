import React from 'react'
import { Product } from "./Product"
import { IProduct } from '../models/IProduct'

function Products({ productsToDisplay } : { productsToDisplay: IProduct[]}) {
    return (
        <div className="products-container">
            {productsToDisplay && productsToDisplay.map(product => {
                return <Product product={product} key={product.id}/>
            })}
        </div>
    )
}

export default React.memo(Products)
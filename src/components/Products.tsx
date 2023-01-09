import React from 'react'
import { Product } from "./Product"
import { IProduct } from '../models/IProduct'

function Products({ productsToDisplay } : { productsToDisplay: IProduct[]}) {
    return (
        <div className="grid grid-cols-4 gap-4 mx-auto">
            {productsToDisplay && productsToDisplay.map(product => {
                return <Product isBasket={false} product={product} key={product.id}/>
            })}
        </div>
    )
}

export default React.memo(Products)
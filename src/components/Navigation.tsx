import React from 'react'
import { Link } from 'react-router-dom'

export function Navigation() {
  return (
    <nav className="h-[50px] flex justify-between px-5 bg-gray-500 items-center text-white">
        <Link to="/">Products</Link>
        <Link to="/basket">Basket</Link>
    </nav>
  )
}

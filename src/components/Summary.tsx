import React, { useEffect, useState } from 'react'
import { BuyProduct } from './BuyProduct'
import { Modal } from './Modal'
import { Order } from './Order';

interface ISummaryProps {
    count: number,
    totalPrice: number,
}

export function Summary({count, totalPrice} : ISummaryProps) {

const [modal, setModal] = useState<Boolean>(false);
const [isOrder, setIsOrder] = useState<Boolean>(false);


const handleBuyClick = () => {
    setModal(true);
}

  return (
    <div className = "w-3/5 items-center flex flex-col mt-10">
        <h5 className="mb-5 text-2xl border-b-2 border-gray-900">Summary</h5>
        <p className="">Products: <span>{count}</span></p>
        <p className="">Total: <span className="font-bold">{totalPrice} $</span></p>
        <button className="py-2 px-10 border-0 rounded mt-10 m-auto bg-yellow-400 hover:bg-blue-400" onClick={handleBuyClick}>BUY NOW</button>
        {modal && <Modal title="Personal details" onClose={()=> setModal(false)}>
                <BuyProduct onOrderProduct={()=> setIsOrder(true)} onBuyProduct={()=>setModal(false)}/>
            </Modal>} 
        {isOrder && <Order/>}
    </div>
  )
}

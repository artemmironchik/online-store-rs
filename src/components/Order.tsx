import React, { useEffect, useState } from 'react'
import { Link, NavLink } from 'react-router-dom';

export function Order() {
    const [timer, setTimer] = useState<number>(5);
    const [isRedirect, setRedirect] = useState<boolean>(false);
    function Timer() {
        let count: number = 0;
        let timerId = setInterval(() => setTimer(count--), 1000);

        setTimeout(() => { clearInterval(timerId); setRedirect(true)}, 3000);
    }
    useEffect(() => {
        Timer();
        localStorage.clear()
        
    }, [])
  return (
    <>
    <div className='fixed bg-black/50 top-0 right-0 left-0 bottom-0'/>
    <div
        className='w-[500px] p-5 rounded bg-white absolute top-[25%] left-1/2 -translate-x-1/2'
    >
        <div>Thanks for your order. Redirect to the store</div>
        <Link to="/"><button>Ok</button></Link>
    </div>
    </>
  )
}

import React, { useEffect, useState } from 'react'
import {Error} from './Error'

interface BuyProductProps {
    onBuyProduct: ()=> void
}

export function BuyProduct({onBuyProduct}: BuyProductProps) {

    const [name, setName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [phone, setPhone] = useState<string>('');
    const [address, setAddress] = useState<string>('');
    const [card, setCard] = useState<string>('');
    const [date, setDate] = useState<string>('');
    const [code, setCode] = useState<string>('');

    const [nameDirty, setNameDirty] = useState<boolean>(false);
    const [emailDirty, setEmailDirty] = useState<boolean>(false);
    const [phoneDirty, setPhoneDirty] = useState<boolean>(false);
    const [addressDirty, setAddressDirty] = useState<boolean>(false);
    const [cardDirty, setCardDirty] = useState<boolean>(false);
    const [dateDirty, setDateDirty] = useState<boolean>(false);
    const [codeDirty, setCodeDirty] = useState<boolean>(false);

    const [errorName, setErrorName] = useState<string>('Please enter valid name');
    const [errorEmail, setErrorEmail] = useState<string>('Please enter valid email');
    const [errorPhone, setErrorPhone] = useState<string>('Please enter valid phone');
    const [errorAddress, setErrorAddress] = useState<string>('Please enter valid address');
    const [errorCard, setErrorCard] = useState<string>('Please enter valid card number');
    const [errorDate, setErrorDate] = useState<string>('Please enter valid date');
    const [errorCode, setErrorCode] = useState<string>('Please enter valid code');

    const [formValid, setFormValid] = useState<boolean>(false);

    useEffect(() => {
        if(errorEmail || errorName || errorPhone || errorAddress || errorCard || errorDate || errorCode) {
            setFormValid(false)
        } else {
            setFormValid(true)
        }
    }, [errorEmail, errorName, errorPhone, errorAddress, errorCard, errorDate, errorCode])


    const submitHandler = (event: React.FormEvent) => {
         onBuyProduct();
    }

    const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        setName(event.target.value)
        if(event.target.value.trim().length === 0) {
            setErrorName('Please enter name')
        } else {
            setErrorName('')
        }
    }

    const changeHandlerEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value)
        const re = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
        if(!re.test(String(event.target.value).toLocaleLowerCase())) {
            setErrorEmail('Unccorect email')
        } else {
            setErrorEmail('')
        }
    }

    const changeHandlerPhone = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPhone(event.target.value)
        const re = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
        if(!re.test(String(event.target.value).toLocaleLowerCase())) {
            setErrorPhone('Unccorect phone')
        } else {
            setErrorPhone('')
        }
    }

    const changeHandlerAddress = (event: React.ChangeEvent<HTMLInputElement>) => {
        setAddress(event.target.value)
        if(event.target.value.trim().length === 0 || event.target.value.trim().length < 5) {
            setErrorAddress('Unccorect address')
        } else {
            setErrorAddress('')
        }
    }

    const changeHandlerCard = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCard(event.target.value)
        if(event.target.value.trim().length === 0 || event.target.value.trim().length !== 16 || isNaN(+event.target.value.trim())) {
            setErrorCard('Unccorect card number')
        } else {
            setErrorCard('')
        }
    }

    const changeHandlerDate = (event: React.ChangeEvent<HTMLInputElement>) => {
        setDate(event.target.value)
        if(event.target.value.trim().length === 0 || event.target.value.trim().length < 4 || event.target.value.trim().length > 5) {
            setErrorDate('Unccorect date')
        } else {
            setErrorDate('')
        }
    }

    const changeHandlerCode = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCode(event.target.value)
        if(event.target.value.trim().length === 0 || isNaN(+event.target.value) || event.target.value.trim().length !== 3) {
            setErrorCode('Unccorect CVV code')
        } else {
            setErrorCode('')
        }
    }

    const blurHandler = (event: React.FocusEvent<HTMLInputElement>) => {
       if(event.target.name === 'name') {
        setNameDirty(true)
        return
       }
       if(event.target.name === 'email') {
        setEmailDirty(true)
        return
       }
       if(event.target.name === 'phone') {
        setPhoneDirty(true)
        return
       }
       if(event.target.name === 'address') {
        setAddressDirty(true)
        return
       }
       if(event.target.name === 'card') {
        setCardDirty(true)
        return
       }
       if(event.target.name === 'date') {
        setDateDirty(true)
        return
       }
       if(event.target.name === 'code') {
        setCodeDirty(true)
        return
       }
    }

  return (
    <form onSubmit={submitHandler} className="flex flex-col">
        {(nameDirty && errorName) && <Error error={errorName}/>}
        <input 
        name="name"
        type="text"
        className="border py-2 px-4 mb-2 w-full outline-0"
        placeholder="Name"
        value={name}
        onChange={changeHandler}
        onBlur={e => blurHandler(e)}
        />
        {(emailDirty && errorEmail) && <Error error={errorEmail}/>}
        <input 
        name="email"
        type="text"
        className="border py-2 px-4 mb-2 w-full outline-0"
        placeholder="Email"
        value={email}
        onChange={changeHandlerEmail}
        onBlur={e => blurHandler(e)}
        />
        {(phoneDirty && errorPhone) && <Error error={errorPhone}/>}
        <input 
        name="phone"
        type="text"
        className="border py-2 px-4 mb-2 w-full outline-0"
        placeholder="Phone (123) 456-7890"
        value={phone}
        onChange={changeHandlerPhone}
        onBlur={e => blurHandler(e)}
        />
        {(addressDirty && errorAddress) && <Error error={errorAddress}/>}
        <input 
        name="address"
        type="text"
        className="border py-2 px-4 mb-2 w-full outline-0"
        placeholder="Address"
        value={address}
        onChange={changeHandlerAddress}
        onBlur={e => blurHandler(e)}
        />
        
        <p className="text-2xl text-center mb-2">Credit card details</p>

        <div className="bg-blue-600 border rounded-xl w-4/5 m-auto flex flex-col items-center py-8">
            <div className='flex w-full px-10 justify-between'>
                <div className='bg-white px-1 py-1 rounded'>
                    <img 
                    className="w-5"
                    src="https://i.guim.co.uk/img/media/b73cc57cb1d46ae742efd06b6c58805e8600d482/16_0_2443_1466/master/2443.jpg?width=700&quality=85&auto=format&fit=max&s=fb1dca6cdd4589cd9ef2fc941935de71" 
                    alt="Card number" />
                </div>
                <input 
                name="card"
                type="text"
                className="border outline-0 text-sm w-4/5 rounded"
                placeholder="Card number"
                value={card}
                onChange={changeHandlerCard}
                onBlur={e => blurHandler(e)}
                /> 
            </div>
            <div className='flex w-full px-20 justify-between mt-10 items-center'>
                <span className="text-xs text-gray-900">Valid: </span>
                <input 
                name="date"
                type="text"
                className="border outline-0 text-sm w-1/5 rounded"
                placeholder="Date"
                value={date}
                onChange={changeHandlerDate}
                onBlur={e => blurHandler(e)}
                /> 
                <span className="text-xs text-gray-900">CVV:</span>
                 <input 
                name="code"
                type="text"
                className="border outline-0 text-sm w-1/5 rounded"
                placeholder="Code"
                value={code}
                onChange={changeHandlerCode}
                onBlur={e => blurHandler(e)}
                /> 
            </div>
        </div>

        {(cardDirty && errorCard) && <Error error={errorCard}/>}
        {(dateDirty && errorDate) && <Error error={errorDate}/>}
        {(codeDirty && errorCode) && <Error error={errorCode}/>}

        {!formValid ? <button disabled={!formValid} type="submit" className="py-2 px-10 border rounded mt-10 m-auto">CONFIRM</button> 
        : <button disabled={!formValid} type="submit" className="py-2 px-10 border bg-yellow-400 rounded mt-10 m-auto">CONFIRM</button>}

    </form>
  )
}

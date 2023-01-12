import { useEffect, useState } from "react"
import {  useSearchParams } from 'react-router-dom';

import './Search.css'

function Search({handleSearchValue, setQuery, query} : {handleSearchValue: (value: string) => void, setQuery: (value: Record<string, string | number> | ((prevState: Record<string, string | number>) => Record<string, string | number>)) => void, query: Record<string, string | number>}) {
  const [searchParams] = useSearchParams();

  const handleSearch = (value:string) => {
    handleSearchValue(value)
    setQuery((prevQuery: Record<string, string | number>) => ({...prevQuery, search: value}))
  }

  useEffect(() => {
    const input = document.getElementById('search-input')
    if(input instanceof HTMLInputElement) query && !input.value && delete query.search
  }, [query])
  
  useEffect(() => {
    const search = searchParams.get('search')
    
    if (search) {
      const input = document.getElementById('search-input')
      input?.setAttribute('value', search)
      handleSearch(search)
    }
  }, [])

  return (
    <input 
        type="text"
        id='search-input'
        onChange={e => handleSearch(e.target.value)}
        placeholder='Search'
    />
  )
}

export default Search
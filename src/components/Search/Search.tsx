import { useEffect, useState } from "react"
import {  useSearchParams } from 'react-router-dom';

import './Search.css'

function Search({handleSearchValue, setQuery, query} : {handleSearchValue: (value: string) => void, setQuery: (value: Record<string, string | number> | ((prevState: Record<string, string | number>) => Record<string, string | number>)) => void, query: Record<string, string | number>}) {
  const [value, setValue] = useState('')
  const [searchParams] = useSearchParams();

  const handleSearch = (value:string) => {
    setValue(value)
    handleSearchValue(value)
    setQuery((prevQuery: Record<string, string | number>) => ({...prevQuery, search: value}))
  }

  useEffect(() => {
    query && !value && delete query.search
  }, [query])
  
  useEffect(() => {
    const search = searchParams.get('search')

    if (search) {
      handleSearch(search)
    }
  }, [])

  return (
    <input 
        type="text"
        value={value}
        id='search-input'
        onChange={e => handleSearch(e.target.value)}
        placeholder='Поиск'
    />
  )
}

export default Search
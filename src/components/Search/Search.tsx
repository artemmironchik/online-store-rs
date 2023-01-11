import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import './Search.css'

function Search({handleSearchValue, setQuery, query} : {handleSearchValue: (value: string) => void, setQuery: (value: Record<string, string | number> | ((prevState: Record<string, string | number>) => Record<string, string | number>)) => void, query: Record<string, string | number>}) {
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleSearchValue(e.target.value)
    setQuery((prevQuery: Record<string, string | number>) => ({...prevQuery, search: e.target.value}))
  }

  useEffect(() => {
    const params = new URLSearchParams()
    const input = document.getElementById('search-input')
    if(input instanceof HTMLInputElement) {
      if (query && input.value !== '' && typeof query.search === 'string') {
        params.append("name", query.search)
      } else {
        params.delete("name")
        delete query.search
      }
    }
  }, [query])

  return (
    <input 
        type="text"
        id='search-input'
        onChange={handleSearch}
        placeholder='Поиск'
    />
  )
}

export default Search
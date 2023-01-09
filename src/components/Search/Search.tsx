import './Search.css'

function Search({handleSearchValue} : {handleSearchValue: (value: string) => void}) {
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleSearchValue(e.target.value)
  }

  return (
    <input 
        type="text"
        className='search-input'
        onChange={handleSearch}
        placeholder='Поиск'
    />
  )
}

export default Search
import { useState, useCallback, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { FILTERS, SORTINGS } from '../utils/constValues';
import { Loader } from '../components/Loader';
import { Error } from '../components/Error';
import { useProducts } from '../hooks/products';
import { IProduct } from '../models/IProduct';
import Search from '../components/Search/Search';
import SortButtons from '../components/SortButtons/SortButtons';
import Products from '../components/Products';
import debounce from 'lodash.debounce';
import Multiselect from '../components/MultiSelect/MultiSelect';
import Amount from '../components/Amount/Amount';
import DualSlider from '../components/DualSlider/DualSlider';
import { FilterFunction } from '../types/FunctionTypes';


export function ProductsPage() {
    const {loading, error, products} = useProducts();
    const [query, setQuery] = useState<Record<string, string | number>>({})
    const navigate = useNavigate()

    const [filterFns, setFilterFns] = useState<Record<string, FilterFunction>>({})
    const [sortingFnName, setSortingFn] = useState<string>()
    const [filteredProducts, setFilteredProducts] = useState<IProduct[]>(products)
    const [min, setMin] = useState<number>(0)
    const [max, setMax] = useState<number>(0)

    const categoriesArr = Array.from(new Set(products.map((product) => product.category)))

    const handleUpdateColorFilter = (optionsSet: Set<string>) => {
        const filterFnsCopy = {...filterFns};
        if (optionsSet.size === 0) {
            delete filterFnsCopy.option;
            setFilterFns(filterFnsCopy)
            return;
        }
        setFilterFns({ ...filterFns, option: FILTERS.includes(optionsSet, 'category') })
    }
    const handleSearchValue = (searchValue: string) => {
        setFilterFns({ ...filterFns, search: FILTERS.search(searchValue, 'title') })
    }
    const handlePriceChange = (min: number, max: number) => {
        setFilterFns({ ...filterFns, range: FILTERS.range(min, max, 'price') })
    }

    const debouncedFilter = useCallback(debounce(() => {
        const allProductsCopy = structuredClone([...products]);
        const filtered = allProductsCopy
            .filter((p: IProduct) => {  
                return Object.values(filterFns).every((fn) => fn(p))
            })
        if(sortingFnName) {
            filtered.sort(SORTINGS[sortingFnName]);
        }
        setFilteredProducts(filtered)
        if(filtered.length === 0) setFilteredProducts(allProductsCopy)
    }, 500), [filterFns, sortingFnName])

    useEffect(() => {
      debouncedFilter()
      const url = Object.entries(query).map((arr) => arr.join('=')).join('&')
      navigate({search: url})
    }, [filterFns, sortingFnName, debouncedFilter, query])

    useEffect(() => {
      const prices = filteredProducts.map((elem) => elem.price)
      setMin(Math.min(...prices))
      setMax(Math.max(...prices))
    }, [filteredProducts])

    return (
      <div>
        <div className='flex flex-col gap-4 mb-6'>
          <Search handleSearchValue={handleSearchValue} setQuery={setQuery} query={query}/>
          <SortButtons sortingFn={sortingFnName} setSortingFn={setSortingFn} setQuery={setQuery} query={query}/>
        </div>
        <div className='flex gap-6'>
          <div>
            <Multiselect options={categoriesArr} title = 'По категории' onSelect={handleUpdateColorFilter} setQuery={setQuery} query={query}></Multiselect>
            <DualSlider min={min} max={max} name='Price' handleValuesChange={handlePriceChange}/>
            <Amount amount={filteredProducts.length}/>
          </div>
          <div>
            {loading && <Loader/>}
            {error && <Error error={error}/>}
            {!filteredProducts.length && products.length ? <Products productsToDisplay={products}/> : filteredProducts.length && products.length ? <Products productsToDisplay={filteredProducts}/> : <div>По вашему запросу ничего не найдено</div>}
          </div>
        </div>
      </div>
    );
}

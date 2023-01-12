import { useState, useCallback, useEffect, useContext } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { FILTERS, SORTINGS } from '../utils/constValues';
import { Loader } from '../components/Loader';
import { Error } from '../components/Error';
import { IProduct } from '../models/IProduct';
import Search from '../components/Search/Search';
import SortButtons from '../components/SortButtons/SortButtons';
import Products from '../components/Products';
import debounce from 'lodash.debounce';
import Multiselect from '../components/MultiSelect/MultiSelect';
import Amount from '../components/Amount/Amount';
import DualSlider from '../components/DualSlider/DualSlider';
import { FilterFunction } from '../types/FunctionTypes';
import { ProductsContext } from '../contexts/ProductsContext'
import { ProductsContextProps } from '../contexts/ProductsContext';

export function ProductsPage() {
    const {loading, error, products, totalPrice} = useContext(ProductsContext) as ProductsContextProps;

    const navigate = useNavigate()

    const [filterFns, setFilterFns] = useState<Record<string, FilterFunction>>({})
    const [sortingFnName, setSortingFn] = useState<string>()
    const [filteredProducts, setFilteredProducts] = useState<IProduct[]>(products)
    const [min, setMin] = useState<number>(0)
    const [max, setMax] = useState<number>(1000)

    const categoriesArr = Array.from(new Set(products.map((product) => product.category)))
    
    const [query, setQuery] = useState<Record<string, string | number>>({})
    const [categoriesSet, setSet] = useState<Set<string>>(new Set())


    const handleCategoryChange = (optionsSet: Set<string>) => {
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
        if(filtered.length === 0 && Object.keys(query).length === 0) setFilteredProducts(allProductsCopy)
    }, 500), [products, filterFns, sortingFnName])

    // useEffect(() => {
    //   for (const [key, value] of searchParams.entries()) {
    //     console.log(`${key}, ${value}`);
    //     if (key === 'category') {
    //       const values = value.split('↕')
    //       // handleCategoryChange()
    //     }
    //   }
    // }, [])

    useEffect(() => {
      debouncedFilter()
      const url = Object.entries(query).map((arr) => arr.join('=')).join('&')
      url && navigate({search: url})
    }, [filterFns, sortingFnName, debouncedFilter, query])

    useEffect(() => {
      if (products.length) {
        const prices = products.map((elem) => elem.price)
        setMin(Math.min(...prices))
        setMax(Math.max(...prices))
      }
    }, [debouncedFilter])

    return (
      <>
      {loading ? <Loader/>
      : <>
        <p className="flex m-auto items-center ml-[50%]">Total price: {totalPrice} $</p>
        <div className='flex flex-col gap-4 mb-6'>
          <Search handleSearchValue={handleSearchValue} setQuery={setQuery} query={query}/>
          <SortButtons sortingFn={sortingFnName} setSortingFn={setSortingFn} setQuery={setQuery} query={query}/>
        </div>
        <div className='flex gap-6'>
          <div className='mb-20'>
            <Multiselect options={categoriesArr} title = 'По категории' onSelect={handleCategoryChange} 
            setQuery={setQuery} query={query} categoriesSet={categoriesSet} setSet={setSet}></Multiselect>
            <DualSlider min={min} max={max} title='Price' handleValuesChange={handlePriceChange} setQuery={setQuery} query={query}/>
            <Amount amount={filteredProducts.length}/>
          </div>
          <div>
            <div>
              {error && <Error error={error}/>}
              { filteredProducts.length? <Products productsToDisplay={filteredProducts}/> : <div>По вашему запросу ничего не найдено</div>}
            </div>
          </div>
        </div>
      </>}
      </>
    );
}

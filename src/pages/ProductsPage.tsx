import { useState, useCallback, useEffect } from 'react';
import { FILTERS, SORTINGS } from '../utils/constValues';
import { Loader } from '../components/Loader';
import { Error } from '../components/Error';
import { useProducts } from '../hooks/products';
import { IProduct } from '../models/IProduct';
import Search from '../components/Search';
import SortButtons from '../components/SortButtons';
import Products from '../components/Products';
import debounce from 'lodash.debounce';
import Multiselect from '../components/MultiSelect';

type FilterFunction = (a: IProduct) => boolean

export function ProductsPage() {
    const {loading, error, products} = useProducts();

    const [filterFns, setFilterFns] = useState<Record<string, FilterFunction>>({})
    const [sortingFnName, setSortingFn] = useState<string>()
    const [filteredProducts, setFilteredProducts] = useState<IProduct[]>([])

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
        const allProductsCopy = structuredClone(products);
        const filtered = allProductsCopy
            .filter((p: IProduct) => {  
                return Object.values(filterFns).every((fn) => fn(p))
            })
        if(sortingFnName) {
            filtered.sort(SORTINGS[sortingFnName]);
        }
        setFilteredProducts(filtered)
    }, 500), [filterFns, sortingFnName])

    useEffect(() => {
        debouncedFilter()
    }, [filterFns, sortingFnName, debouncedFilter])

    return (
        <div className="grid grid-cols-4 gap-4 flex-wrap justify-center items-center flex items-center pt-5 mx-auto">
            {loading && <Loader/>}
            {error && <Error error={error}/>}
            <Search handleSearchValue={handleSearchValue}/>
            <SortButtons sortingFn={sortingFnName} setSortingFn={setSortingFn}/>
            <Multiselect options={categoriesArr} title = 'По категории' onSelect={handleUpdateColorFilter}></Multiselect>
            {/* <SortButtons sortingFn={sortingFn} setSortingFn={setSortingFn}/>
            <Price handlePriceChange={handlePriceChange}/> */}
            {filteredProducts.length ? <Products productsToDisplay={filteredProducts}/> : <div>По вашему запросу ничего не найдено</div>}
            {/* <Amount amount={filteredProducts.length}/> */}
        </div>
    );
}

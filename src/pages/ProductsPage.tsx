import { useState, useCallback, useEffect } from 'react';
import { FILTERS } from '../utils/constValues';
import { Loader } from '../components/Loader';
import { Error } from '../components/Error';
import { useProducts } from '../hooks/products';
import { IProduct } from '../models/IProduct';
import Search from '../components/Search';
import SortButtons from '../components/SortButtons';
import Products from '../components/Products';
import debounce from 'lodash.debounce';

type FilterFunction = (a: IProduct) => boolean

export function ProductsPage() {
    const {loading, error, products} = useProducts();

    const [filterFns, setFilterFns] = useState<Record<string, FilterFunction>>({})
    const [sortingFn, setSortingFn] = useState<string>()
    const [filteredProducts, setFilteredProducts] = useState<IProduct[]>([])

    // const handleUpdateColorFilter = (colorsSet: Set<string>) => {
    //     const filterFnsCopy = {...filterFns};
    //     if (colorsSet.size === 0) {
    //         delete filterFnsCopy.color;
    //         setFilterFns(filterFnsCopy)
    //         return;
    //     }
    //     setFilterFns({ ...filterFns, color: FILTERS.includes(colorsSet, 'color') })
    // }
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
            .sort(sortingFn)
        setFilteredProducts(filtered)
    }, 500), [filterFns, sortingFn])

    useEffect(() => {
        debouncedFilter()
    }, [filterFns, sortingFn, debouncedFilter])

    return (
        <div className="grid grid-cols-4 gap-4 flex-wrap justify-center items-center flex items-center pt-5 mx-auto">
            {loading && <Loader/>}
            {error && <Error error={error}/>}
            <Search handleSearchValue={handleSearchValue}/>
            {/* <SortButtons sortingFn={sortingFn} setSortingFn={setSortingFn}/>
            <Multiselect options={COLORS} title = 'По цвету' onSelect={handleUpdateColorFilter}></Multiselect>
            <Price handlePriceChange={handlePriceChange}/> */}
            {filteredProducts.length ? <Products productsToDisplay={filteredProducts}/> : <div>По вашему запросу ничего не найдено</div>}
            {/* <Amount amount={filteredProducts.length}/> */}
        </div>
    );
}

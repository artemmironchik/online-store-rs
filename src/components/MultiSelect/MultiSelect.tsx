import { useEffect, useState } from "react"
import {  useSearchParams } from 'react-router-dom';

import './MultiSelect.css'

function Multiselect({ options, title, onSelect, setQuery, query, categoriesSet, setSet } : { options: Array<string>, title: string, onSelect: (value: Set<string>) => void, 
    setQuery: (value: Record<string, string | number> | ((prevState: Record<string, string | number>) => Record<string, string | number>)) => void, query: Record<string, string | number>, categoriesSet: Set<string>, setSet: (value: Set<string>) => void}) {
    const [searchParams] = useSearchParams();

    const handleSelect = (name : string) => {
      const newSet = new Set(Array.from(categoriesSet))
      if(newSet.has(name)) {
        newSet.delete(name)
      } else {
        newSet.add(name)
      }
      setQuery((prevQuery: Record<string, string | number>) => ({...prevQuery, category: Array.from(newSet).join('↕')}))

      setSet(newSet)
      onSelect(newSet)
    }

    useEffect(() => {
      const category = searchParams.get('category')
      const categoryValues = category?.split('↕')

      if (category && categoryValues) {
        for (const value of categoryValues) {
          handleSelect(value);
        }
      }
    }, [])

    useEffect(() => {
      categoriesSet.size === 0 && delete query.category
    }, [categoriesSet])

    return (
      <div className="multiselect-container">
          <div className="multiselect-text">
              <p>{title}</p>
          </div>
          <div className="list-of-options">
              {options.map(option => 
                  <label>
                      <input type="checkbox" checked={categoriesSet.has(option)} name={option} onChange={e => handleSelect(e.target.name)}/>
                      {option}
                  </label>
              )}
          </div>
      </div>
    )
}

export default Multiselect
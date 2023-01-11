import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import './MultiSelect.css'

function Multiselect({ options, title, onSelect, setQuery, query } : { options: Array<string>, title: string, onSelect: (value: Set<string>) => void, 
    setQuery: (value: Record<string, string | number> | ((prevState: Record<string, string | number>) => Record<string, string | number>)) => void, query: Record<string, string | number>}) {
    const [set, setSet] = useState<Set<string>>(new Set())

    const handleSelect = ({ target: { name } } : { target: HTMLInputElement}) => {
      if(set.has(name)) {
        set.delete(name)
      } else {
        set.add(name)
      }
      setQuery((prevQuery: Record<string, string | number>) => ({...prevQuery, category: Array.from(set).join('↕')}))

      const newSet = new Set(Array.from(set))
      setSet(newSet)
      onSelect(newSet)
    }

    useEffect(() => {
      const params = new URLSearchParams()
      if (set.size !== 0 && typeof query.category === 'string') {
        params.append("category", query.category)
      } else {
        params.delete("category")
        delete query.category
      }
    }, [set])

    return (
      <div className="multiselect-container">
          <div className="multiselect-text">
              <p>{title}</p>
          </div>
          <div className="list-of-options">
              {options.map(option => 
                  <label>
                      <input type="checkbox" checked={set.has(option)} name={option} onChange={handleSelect}/>
                      {option}
                  </label>
              )}
          </div>
      </div>
    )
}

export default Multiselect
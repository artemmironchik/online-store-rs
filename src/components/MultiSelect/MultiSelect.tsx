import { useState } from 'react'
import './MultiSelect.css'

function Multiselect({ options, title, onSelect } : { options: Array<string>, title: string, onSelect: (value: Set<string>) => void}) {
    const [set, setSet] = useState<Set<string>>(new Set())

    const handleSelect = ({ target: { name } } : { target: HTMLInputElement}) => {
      set.has(name) ? set.delete(name) : set.add(name)

      const newSet = new Set(Array.from(set))
      setSet(newSet)
      onSelect(newSet)
    }

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
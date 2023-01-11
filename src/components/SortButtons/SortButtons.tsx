import { useEffect, useState } from "react"
import { SORTINGS } from '../../utils/constValues'
import './SortButtons.css'

function SortButtons({sortingFn, setSortingFn, setQuery, query} : {sortingFn: string | undefined, setSortingFn: (value: string) => void, setQuery: (value: Record<string, string | number> | ((prevState: Record<string, string | number>) => Record<string, string | number>)) => void, query: Record<string, string | number>}) {
    const [clickedButton, setClickedButton] = useState<string>()

    const handleClick = (name: string) => {
        setQuery((prevQuery: Record<string, string | number>) => ({...prevQuery, sort: name}))
        setSortingFn(name)
        setClickedButton(name)
    }

    useEffect(() => {
      const params = new URLSearchParams()
      if (query && typeof query.sort === 'string') {
        params.append("name", query.sort)
      }
    }, [])

    return (
      <div className="buttons-container">
        {Object.keys(SORTINGS).map((name) => {
          return (
            <button
              onClick={() => handleClick(name)}
              style={{ backgroundColor: name === clickedButton ?  '#f5f5f5' : '#ffffff'}}
            >
            {name}
            </button>
          )
        }
        )}
      </div>
    )
}

export default SortButtons
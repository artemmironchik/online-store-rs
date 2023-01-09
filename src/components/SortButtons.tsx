import {useState} from 'react'
import { SORTINGS } from '../utils/constValues'

function SortButtons({setSortingFn} : {setSortingFn: (value: string) => void}) {
    const [clickedButton, setClickedButton] = useState<string>()

    const handleClick = (name: string) => {
        // setSortingFn(SORTINGS[name])
        setClickedButton(name)
    }
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
import { FC } from "react";
import { FilterFunction } from '../types/FunctionTypes';
import { useNavigate } from 'react-router-dom';

interface ResetButtonProps {
  setQuery: (value: Record<string, string | number> | ((prevState: Record<string, string | number>) => Record<string, string | number>)) => void;
  setFilterFns: (value: Record<string, FilterFunction> | ((prevState: Record<string, FilterFunction>) => Record<string, FilterFunction>)) => void;
}

const ResetButton: FC<ResetButtonProps> = ({setQuery, setFilterFns}) => {
  const navigate = useNavigate()
  const handleClick = () => {
    setQuery((prevQuery: Record<string, string | number>) => {
      let newQuery = JSON.parse(JSON.stringify(prevQuery))
      Object.keys(newQuery).forEach(key => delete newQuery[key]);
      return newQuery
    });
    setFilterFns((filterFns: Record<string, FilterFunction>) => {
      let newFilterFns = JSON.parse(JSON.stringify(filterFns))
      Object.keys(newFilterFns).forEach(key => delete newFilterFns[key]);
      return newFilterFns
    })
    navigate('/')
  }

  return (
    <button
      className='cursor-pointer border border-solid p-x-5 p-y-27'
      onClick={handleClick}
    >
    Reset Filters
    </button>
  )
}

export default ResetButton
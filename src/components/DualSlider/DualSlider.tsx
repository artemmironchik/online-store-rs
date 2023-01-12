import { ChangeEvent, FC, useCallback, useEffect, useState, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import './DualSlider.css';

interface DualSliderProps {
  min: number;
  max: number;
  title: string;
  handleValuesChange: (a: number, b: number) => void;
  setQuery: (value: Record<string, string | number> | ((prevState: Record<string, string | number>) => Record<string, string | number>)) => void;
  query: Record<string, string | number>;
}

const DualSlider: FC<DualSliderProps> = ({ min, max, title, handleValuesChange, setQuery, query }) => {
  const [minVal, setMinVal] = useState(min);
  const [maxVal, setMaxVal] = useState(max);
  const minValRef = useRef(min);
  const maxValRef = useRef(max);
  const range = useRef<HTMLDivElement>(null); 

  const [searchParams] = useSearchParams();

  const getPercent = useCallback((value: number) =>
    Math.round(((value - min) / (max - min)) * 100), [min, max])

  const handleChange = (value: string, name: string) => {
    if(name === 'min-range') {
      const newValue = Math.min(Number(value), maxVal);
      setMinVal(newValue);
      minValRef.current = newValue;
      handleValuesChange(minValRef.current, maxValRef.current)
    } else {
      const newValue = Math.max(Number(value), minVal);
      setMaxVal(newValue);
      maxValRef.current = newValue;
      handleValuesChange(minValRef.current, maxValRef.current)
    }

    if(title === 'Price') {
      setQuery((prevQuery: Record<string, string | number>) => ({...prevQuery, price: `${minValRef.current}↕${maxValRef.current}`}))
    } else {
      setQuery((prevQuery: Record<string, string | number>) => ({...prevQuery, stock: `${minValRef.current}↕${maxValRef.current}`}))
    }
  }

  useEffect(() => {
    const price = searchParams.get('price')
    if(price) {
      const values = price.split('↕')
      const min = values[0]
      const max = values[1]
      handleChange(min, 'min-range')
      handleChange(max, 'max-range')
    }
  }, [])

  useEffect(() => {
    const minPercent = getPercent(minVal);
    const maxPercent = getPercent(maxValRef.current);

    if (range.current) {
      range.current.style.left = `${minPercent}%`;
      range.current.style.width = `${maxPercent - minPercent}%`;
    }
  }, [minVal, getPercent]);

  useEffect(() => {
    const minPercent = getPercent(minValRef.current);
    const maxPercent = getPercent(maxVal);

    if (range.current) {
      range.current.style.width = `${maxPercent - minPercent}%`;
    }
  }, [maxVal, getPercent]);

  return (
    <div className='container dual-slider'>
        <p className='title'>{title}</p>
        <div className='slider-container'>
          <input
            type='range'
            name='min-range'
            min={min}
            max={max}
            step={1}
            value={minVal}
            onChange={e => handleChange(e.target.value, e.target.name)}
            className='thumb thumb--left'
          />
          <input
            type='range'
            name='max-range'
            min={min}
            max={max}
            step={1}
            value={maxVal}
            onChange={e => handleChange(e.target.value, e.target.name)}
            className='thumb thumb--right'
          />

          <div className='slider'>
            <div className='slider__track'></div>
            <div ref={range} className='slider__range'></div>
            <div className='slider__left-value'>{minVal}</div>
            <div className='slider__right-value'>{maxVal}</div>
          </div>
        </div>
      </div>
  );
};

export default DualSlider;

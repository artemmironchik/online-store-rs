import { ChangeEvent, FC, useCallback, useEffect, useState, useRef } from 'react';
import './DualSlider.css';

interface DualSliderProps {
  min: number;
  max: number;
  name: string;
  handleValuesChange: (a: number, b: number) => void;
}

const DualSlider: FC<DualSliderProps> = ({ min, max, name, handleValuesChange }) => {
  const [minVal, setMinVal] = useState(min);
  const [maxVal, setMaxVal] = useState(max);
  const minValRef = useRef(min);
  const maxValRef = useRef(max);
  const range = useRef<HTMLDivElement>(null); 

  const getPercent = useCallback((value: number) =>
    Math.round(((value - min) / (max - min)) * 100), [min, max])

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    let { value, name } = e.target;
    if(name === 'min-range') {
      const newValue = Math.min(Number(value), maxVal - 1);
      setMinVal(newValue);
      minValRef.current = newValue;
      handleValuesChange(minVal, maxVal)
    } else {
      const newValue = Math.max(Number(value), minVal + 1);
      setMaxVal(newValue);
      maxValRef.current = newValue;
      handleValuesChange(minVal, maxVal)
    }
  }

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
    <div className='container'>
        <p>{name}</p>
        <div className='slider-container'>
          <input
            type='range'
            name='min-range'
            min={min}
            max={max}
            value={minVal}
            onChange={handleChange}
            className='thumb thumb--left'
          />
          <input
            type='range'
            name='max-range'
            min={min}
            max={max}
            value={maxVal}
            onChange={handleChange}
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

import React from 'react';
import useDragging from '../hooks/useDragging';
import '../styles/slider.css';
import { SliderProps } from '../types/Props/SliderProps';

export default function Slider ({ minRange, maxRange, defaultValues, fixedValues, isFixed }: SliderProps) {

  const {range, values, setValues, sliderRef, startDrag, stopDrag} = useDragging(minRange, maxRange, defaultValues, fixedValues, isFixed);

  const handleChangeMinValue = () => {
    const newValue = prompt("Enter the new minimum value:", Math.round(values.min).toString());
    if (newValue === null) {
      // The user pressed "Cancel" in the prompt.
      return;
    } else if (isNaN(Number(newValue)) || newValue.trim() === "") {
      alert("Please enter a valid number.");
    } else if (Number(newValue) >= values.max) {
      alert("The minimum value cannot be equal to or greater than the current maximum value.");
    } else if (Number(newValue) < range.min) {
      alert(`The value must be greater than or equal to ${range.min}.`);
    } else {
      setValues(prevValues => ({
        ...prevValues,
        min: Number(newValue)
      }));
    }
  };

  const handleChangeMaxValue = () => {
    const newValue = prompt("Enter the new maximum value:", Math.round(values.max).toString());
    if (newValue === null) {
      // The user pressed "Cancel" in the prompt.
      return;
    } else if (isNaN(Number(newValue)) || newValue.trim() === "") {
      alert("Please enter a valid number.");
    } else if (Number(newValue) <= values.min) {
      alert("The maximum value cannot be equal to or less than the current minimum value.");
    } else if (Number(newValue) > range.max) {
      alert(`The value must be less than or equal to ${range.max}.`);
    } else {
      setValues(prevValues => ({
        ...prevValues,
        max: Number(newValue)
      }));
    }
  };

  const renderFixedValueMarks = () => {
    if (!isFixed || !fixedValues || fixedValues.length === 0) {
      return null;
    }

    return fixedValues.map((value, index) => {
      // Calcular la posición de la marca
      const positionPercentage = ((value - range.min) / totalRangeWidth) * 100;
      return (
        <div
          key={index}
          className="slider-mark"
          style={{ left: `${positionPercentage}%` }}
        ></div>
      );
    });
  };


  // Cálculos para posicionar la barra y los thumbs dentro del slider
  const totalRangeWidth = range.max - range.min;
  const minLeftPercentage = ((values.min - range.min) / totalRangeWidth) * 100;
  const maxLeftPercentage = ((values.max - range.min) / totalRangeWidth) * 100;
  const trackWidthPercentage = maxLeftPercentage - minLeftPercentage;

  return (
    <div className='slider-wrapper'>
      <div className="slider">
        <div className="slider-container" ref={sliderRef} onMouseUp={stopDrag}>
          <div className="slider-track" style={{
            left: `${minLeftPercentage}%`,
            width: `${trackWidthPercentage}%`
          }} />
           {renderFixedValueMarks()}
            <div className="slider-thumb" data-testid={'min-thumb'} style={{ left: `${minLeftPercentage}%` }}
              onMouseDown={(e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>) => startDrag(e, 'min')}
              onTouchStart={(e: React.TouchEvent<HTMLDivElement> | React.MouseEvent<HTMLDivElement>) => startDrag(e, 'min')} />
            <div className="slider-thumb" data-testid={'max-thumb'} style={{ left: `${maxLeftPercentage}%` }}
              onMouseDown={(e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>) => startDrag(e, 'max')}
              onTouchStart={(e: React.TouchEvent<HTMLDivElement> | React.MouseEvent<HTMLDivElement>) => startDrag(e, 'max')} />
          <p className="slider-label-min" onClick={() => !isFixed && handleChangeMinValue()}>
            <span className={`${isFixed ? '' : 'clickable'} left-value`} data-testid={'min-value'}>{`${values.min.toFixed(2)}`}</span>
            <span className="slider-currency">{'€'}</span>
          </p>
          <p className='slider-label-max' onClick={() => !isFixed && handleChangeMaxValue()}>
            <span className={`${isFixed ? '' : 'clickable'} right-value`} data-testid={'max-value'}>{`${values.max.toFixed(2)}`}</span>
            <span className="slider-currency">{'€'}</span>
          </p>
        </div>
      </div>
    </div>
  )
}
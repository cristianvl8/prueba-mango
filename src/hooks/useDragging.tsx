import { useEffect, useRef, useState } from 'react';

export default function useDragging(minRange: number, maxRange: number, defaultValues: number[], fixedValues: number[], isFixed: boolean) {

  const minSliderRange = fixedValues?.length > 0 ? fixedValues[0] : minRange;
  const maxSliderRange = fixedValues?.length > 0 ? fixedValues[fixedValues.length - 1] : maxRange;

  const initialMinValue = fixedValues?.length > 0 ? fixedValues[0] : defaultValues[0];
  const initialMaxValue = fixedValues?.length > 0 ? fixedValues[fixedValues.length - 1] : defaultValues[1];

  const range = { min: minSliderRange, max: maxSliderRange};
  const [values, setValues] = useState({ min: initialMinValue, max: initialMaxValue});
  const [dragging, setDragging] = useState(null);
  const sliderRef = useRef(null);

  useEffect(() => {
    const handleMouseUp = () => stopDrag();
    const handleMouseMove = (e: MouseEvent | TouchEvent) => isFixed ? onFixedDrag(e) : onDrag(e);

    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('mousemove', handleMouseMove);

    if (sliderRef.current) {
      sliderRef.current.addEventListener('touchend', handleMouseUp, { passive: false });
      sliderRef.current.addEventListener('touchmove', handleMouseMove, { passive:false });
    }

    return () => {
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('mousemove', handleMouseMove);

      if (sliderRef.current) {
        sliderRef.current.removeEventListener('touchend', handleMouseUp);
        sliderRef.current.removeEventListener('touchmove', handleMouseMove);
      }
    };
  }, [dragging]);

  const onDrag = (e: MouseEvent | TouchEvent) => {
    if (!dragging || !sliderRef.current) {
      return;
    }

    e.preventDefault();
    const slider = sliderRef.current;
    const rect = slider.getBoundingClientRect();
    const clientX = (e.type.includes('touch') ? (e as TouchEvent).touches[0].clientX : (e as MouseEvent).clientX);
    const newPosition = ((clientX - rect.left) / rect.width) * (range.max - range.min) + range.min;

    // Asegura que la nueva posición del thumb no supere los límites de rango del slider.
    const newThumbValue = Math.min(Math.max(newPosition, range.min), range.max);

    // Evita colisiones entre los dos thumbs del slider
    if (dragging === 'min') {
      setValues((prevValues) => ({
        ...prevValues,
        min: Math.min(newThumbValue, prevValues.max - 1),
      }));
    } else {
      setValues((prevValues) => ({
        ...prevValues,
        max: Math.max(newThumbValue, prevValues.min + 1),
      }));
    }
    };


  const onFixedDrag = (e: MouseEvent | TouchEvent) => {
    if (!dragging || !sliderRef.current || !isFixed) {
      return;
    }

    e.preventDefault();
    const slider = sliderRef.current;
    const rect = slider.getBoundingClientRect();
    const clientX = (e.type.includes('touch') ? (e as TouchEvent).touches[0].clientX : (e as MouseEvent).clientX);
    const positionPercentage = ((clientX - rect.left) / rect.width) * 100;
    let closestValue = getClosestFixedValue(positionPercentage);

    if (dragging === 'min') {
        // Encuentra el índice del valor fijo más cercano para el "thumb" mínimo
        const closestIndex = fixedValues.indexOf(closestValue);
        // Obtiene el índice del valor actual del "thumb" máximo para evitar la superposición
        const maxValueIndex = fixedValues.indexOf(values.max);
        if (closestIndex >= maxValueIndex) {
        // Si el "thumb" mínimo intenta moverse al "thumb" máximo o más allá, se para en el valor anterior
        closestValue = fixedValues[Math.max(0, maxValueIndex - 1)];
        }
        setValues(prevValues => ({ ...prevValues, min: closestValue }));
    } else {
        // Encuentra el índice del valor fijo más cercano para el "thumb" máximo
        const closestIndex = fixedValues.indexOf(closestValue);
        // Obtiene el índice del valor actual del "thumb" mínimo para evitar la superposición
        const minValueIndex = fixedValues.indexOf(values.min);
        if (closestIndex <= minValueIndex) {
        // Si el "thumb" máximo intenta moverse al "thumb" mínimo o más allá, se para en el valor anterior
        closestValue = fixedValues[Math.min(fixedValues.length - 1, minValueIndex + 1)];
        }
        setValues(prevValues => ({ ...prevValues, max: closestValue }));
    }
  };

  const startDrag = (e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>, marker: string) => {
    setDragging(marker);
  };

  const stopDrag = () => {
    setDragging(null);
  };

  const getClosestFixedValue = (positionPercentage: number) => {
    // Convertir el porcentaje a un valor absoluto dentro del rango del slider
    const sliderRangeValue = ((positionPercentage / 100) * (range.max - range.min)) + range.min;
    // Reducir el array de valores fijos para encontrar el más cercano al valor absoluto calculado
    return fixedValues.reduce((prev, curr) =>
      Math.abs(curr - sliderRangeValue) < Math.abs(prev - sliderRangeValue) ? curr : prev
    );
  };

  return ({range, values, setValues, sliderRef, startDrag, stopDrag})
}

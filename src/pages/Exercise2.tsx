import React from 'react'
import Slider from '../components/Slider'
import useGetSliderFixedValuesQuery from '../service/hooks/useGetSliderFixedValuesQuery'

export default function Exercise2() {

const {data: sliderFixedData, isSuccess} = useGetSliderFixedValuesQuery()
const firstFixedValue = sliderFixedData?.rangeValues[0]
const lastFixedValue = sliderFixedData?.rangeValues[sliderFixedData?.rangeValues.length - 1]

    if (!isSuccess) return null

    return (
        <Slider isFixed={true} fixedValues={sliderFixedData?.rangeValues} defaultValues={[firstFixedValue, lastFixedValue]}/>
    )

}
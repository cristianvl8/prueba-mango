import React from 'react'
import Slider from '../components/Slider'
import useGetSliderValuesQuery from '../service/hooks/useGetSliderValuesQuery'

export default function Exercise1() {

const {data: sliderData, isSuccess} = useGetSliderValuesQuery()

    if (!isSuccess) return null

    return (
        <Slider isFixed={false} minRange={0} maxRange={100} defaultValues={[sliderData?.values?.min, sliderData?.values?.max]}/>
    )
}

import { useQuery } from "@tanstack/react-query";
import { getSliderFixedValues } from "../getSliderFixedValues";
import { GetSliderFixedValuesTypes } from "../../types/api/getSliderFixedValuesTypes"

export default function useGetFixedValuesQuery() {

  return useQuery<GetSliderFixedValuesTypes>({
    queryKey: ["getSliderFixedValues"],
    queryFn: getSliderFixedValues,
    staleTime: Infinity,
  });
}
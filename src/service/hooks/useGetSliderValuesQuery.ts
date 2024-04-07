import { useQuery } from "@tanstack/react-query";
import { GetSliderValuesTypes } from "../../types/api/getSliderValuesTypes";
import { getSliderValues } from "../getSliderValues";

export default function useGetSliderValuesQuery() {

  return useQuery<GetSliderValuesTypes>({
    queryKey: ["getSliderValues"],
    queryFn: getSliderValues,
    staleTime: Infinity,
  });
}